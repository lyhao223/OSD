import React, { useState } from "react";
import { FaImage } from "react-icons/fa";
import Title from "../Reuseable/Title";
import Input from "../Reuseable/Input";
import Label from "../Reuseable/Label";
import Button from "../Reuseable/Button";
import Result from "../Reuseable/Result";
import Image from "../Reuseable/Image";

const TrafficSignClassification: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [classification, setClassification] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // New loading state

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setIsLoading(true); // Set loading state to true

      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch(
          "http://127.0.0.1:5001/detectionTrafficSign",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          const signName = responseData.Sign;
          setClassification(signName);
        } else {
          throw new Error("Failed to fetch");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false); // Hide loading after 2 seconds
        }, 2000); // Set loading state to false after API call
      }
    }
  };

  const handleClear = () => {
    setImage(null);
    setClassification(null);
    setIsLoading(false); // Clear image state
  };

  return (
    <section id="Function" className="min-h-[700px] p-7">
      <Title text="Traffic Sign Classification" />
      <div className="mb-10 w-full flex flex-row items-center space-y-4 justify-center md:flex-row ">
        <Input handleUpload={handleUpload} id="upload-image" />
        <Label htmlFor="upload-image" />
        {image && (
          <Button
            onClick={handleClear}
            classesBG="bg-red-500"
            classesHV="hover:shadow-red-700">
            Clear
          </Button>
        )}
      </div>

      {image && <Image src={image} />}
      {isLoading ? (
        <p className="text-2xl leading-6 font-merriweather mb-12">Loading...</p>
      ) : (
        classification && <Result>{classification}</Result>
      )}
    </section>
  );
};

export default TrafficSignClassification;
