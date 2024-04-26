from flask import Flask, request, Response
from flask_cors import CORS
from keras.models import load_model
from utils.datasets import get_labels
from utils.inference import detect_faces, apply_offsets, load_detection_model
from utils.preprocessor import preprocess_input
import numpy as np
import cv2
import json

app = Flask(__name__)
CORS(app)
# parameters for loading data and images
detection_model_path = '../trained_models/detection_models/haarcascade_frontalface_default.xml'
emotion_model_path = '../trained_models/emotion_models/fer2013_mini_XCEPTION.110-0.65.hdf5'
emotion_labels = get_labels('fer2013')

# hyper-parameters for bounding boxes shape
emotion_offsets = (20, 40)

# loading models
face_detection = load_detection_model(detection_model_path)
emotion_classifier = load_model(emotion_model_path, compile=False)

# getting input model shapes for inference
emotion_target_size = emotion_classifier.input_shape[1:3]

@app.route('/videoEmotion', methods=['POST'])
def predict():
    if request.method == 'POST':
        file = request.files['file']
        if file is not None:
            filestr = request.files['file'].read()
            npimg = np.fromstring(filestr, np.uint8)
            frame = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
            gray_image = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = detect_faces(face_detection, gray_image)

            emotion_predictions = []
            for face_coordinates in faces:
                x1, x2, y1, y2 = apply_offsets(face_coordinates, emotion_offsets)
                gray_face = gray_image[y1:y2, x1:x2]
                gray_face = cv2.resize(gray_face, (emotion_target_size))
                gray_face = preprocess_input(gray_face, True)
                gray_face = np.expand_dims(gray_face, 0)
                gray_face = np.expand_dims(gray_face, -1)
                emotion_prediction = emotion_classifier.predict(gray_face)
                emotion_label_arg = np.argmax(emotion_prediction)
                emotion_text = emotion_labels[emotion_label_arg]
                emotion_predictions.append(emotion_text)

            return Response(response=json.dumps(emotion_predictions), status=200, mimetype="application/json")
    return Response(response="method not allowed", status=405)

if __name__ == '__main__':
    app.run(host='localhost', port=5173)