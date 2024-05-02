import React, { Fragment, useState } from "react";
import axios from "axios";
import { FaImage } from "react-icons/fa";
import Title from "../Reuseable/Title";
import Input from "../Reuseable/Input";
import Label from "../Reuseable/Label";
import Button from "../Reuseable/Button";
import Result from "../Reuseable/Result";
import Image from "../Reuseable/Image";
const ImageEmotion: React.FC = () => {
  const [emotion, setEmotion] = useState<string | null>(null);
  const [imgEmotion, setImgEmotion] = useState<string | null>(null); // New image state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleUploadImgEmotion = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImgEmotion(URL.createObjectURL(file)); // Set image state
      setIsLoading(true);
      const formData1 = new FormData();
      formData1.append("image", file);

      try {
        const response = await axios.post(
          "http://127.0.0.2:5002/emotion",
          formData1,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.emotion) {
          setEmotion(response.data.emotion);
        } else {
          console.log("No face detected");
        }
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
  };
  const handleClearEmotion = () => {
    setEmotion(null);
    setImgEmotion(null);
    setIsLoading(false); // Clear image state
  };
  return (
    <section className="min-h-[700px] p-7 bg-violet-950" id="Function">
      <Title text="Detection Emotion" />
      <div className="mb-10 w-full flex flex-row items-center justify-center md:flex-row">
        <Input
          handleUpload={handleUploadImgEmotion}
          id="upload-image-emotion"
        />
        <Label htmlFor="upload-image-emotion" />
        {imgEmotion && (
          <Button
            onClick={handleClearEmotion}
            classesBG="bg-red-500"
            classesHV="hover:shadow-red-700">
            Clear
          </Button>
        )}
      </div>
      {imgEmotion && <Image src={imgEmotion} />}
      {emotion && <Result>{emotion}</Result>}
    </section>
  );
};

export default ImageEmotion;
