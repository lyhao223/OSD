import React, { useRef, useCallback } from 'react';
import Webcam from "react-webcam";
import axios from 'axios';

interface IWebcam extends Webcam {
  getScreenshot: () => string;
}

const WebcamCapture: React.FC = () => {
  const webcamRef = useRef<IWebcam | null>(null);

  const capture = useCallback(
    () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        axios.post('http://localhost:5000/apiVideo', { image: imageSrc })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    [webcamRef]
  );

  return (
    <>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Capture photo</button>
    </>
  );
};

export default WebcamCapture;