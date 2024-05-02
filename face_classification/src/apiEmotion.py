from flask import Flask, request, jsonify
from keras.models import load_model
import numpy as np
import cv2
from utils.datasets import get_labels
from utils.inference import detect_faces, draw_text, draw_bounding_box, apply_offsets, load_detection_model
from utils.preprocessor import preprocess_input

app = Flask(__name__)

# parameters for loading data and images
detection_model_path = '../trained_models/detection_models/haarcascade_frontalface_default.xml'
emotion_model_path = '../trained_models/emotion_models/fer2013_mini_XCEPTION.110-0.65.hdf5'
emotion_labels = get_labels('fer2013')

# hyper-parameters for bounding boxes shape
frame_window = 10
emotion_offsets = (20, 40)

# loading models
face_detection = load_detection_model(detection_model_path)
emotion_classifier = load_model(emotion_model_path, compile=False)

# getting input model shapes for inference
emotion_target_size = emotion_classifier.input_shape[1:3]

@app.route('/emotion', methods=['POST'])
def emotion():
    # get image from the request
    image = request.files["image"].read()
    image = cv2.imdecode(np.frombuffer(image, np.uint8), cv2.IMREAD_COLOR)  
    # detect faces in the image
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = detect_faces(face_detection, gray_image)

    for face_coordinates in faces:
        x1, x2, y1, y2 = apply_offsets(face_coordinates, emotion_offsets)
        gray_face = gray_image[y1:y2, x1:x2]

        try:
            gray_face = cv2.resize(gray_face, (emotion_target_size))
        except:
            continue

        gray_face = preprocess_input(gray_face, True)
        gray_face = np.expand_dims(gray_face, 0)
        gray_face = np.expand_dims(gray_face, -1)
        emotion_prediction = emotion_classifier.predict(gray_face)
        emotion_probability = np.max(emotion_prediction)
        emotion_label_arg = np.argmax(emotion_prediction)
        emotion_text = emotion_labels[emotion_label_arg]

        # return the first detected emotion
        return jsonify({"emotion": emotion_text})

    return jsonify({"error": "No face detected"}), 400

if __name__ == '__main__':
    app.run(host='127.0.0.2', port=5002,debug=True)