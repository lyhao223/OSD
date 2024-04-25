import pandas as pd
import numpy as np
import cv2

class DataManager:
    def __init__(self, dataset_path=None, image_size=(48, 48)):
        self.dataset_path = dataset_path or '../datasets/fer2013/fer2013.csv'
        self.image_size = image_size

    def get_data(self):
        data = pd.read_csv(self.dataset_path)
        pixels = data['pixels'].tolist()
        faces = [cv2.resize(np.asarray([int(pixel) for pixel in pixel_sequence.split(' ')]).reshape(48, 48).astype('uint8'), self.image_size).astype('float32') for pixel_sequence in pixels]
        faces = np.asarray(faces).reshape(-1, 48, 48, 1)
        emotions = pd.get_dummies(data['emotion']).values
        return faces, emotions

def get_labels(dataset_name):
    if dataset_name == 'fer2013':
        return {0: 'angry', 1: 'disgust', 2: 'fear', 3: 'happy', 4: 'sad', 5: 'surprise', 6: 'neutral'}
    else:
        raise Exception('Invalid dataset name')

def split_data(x, y, validation_split=.2):
    num_samples = len(x)
    num_train_samples = int((1 - validation_split) * num_samples)
    train_data = (x[:num_train_samples], y[:num_train_samples])
    val_data = (x[num_train_samples:], y[num_train_samples:])
    return train_data, val_data
