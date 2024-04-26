import React, { useRef, useCallback } from 'react';
import Webcam from "react-webcam";

interface IWebcam extends Webcam {
  getScreenshot: () => string;
}

const WebcamCapture: React.FC = () => {
  const webcamRef = useRef<IWebcam | null>(null);

const capture = useCallback(
  () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      fetch('http://localhost:5000/apiVideo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: imageSrc })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
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