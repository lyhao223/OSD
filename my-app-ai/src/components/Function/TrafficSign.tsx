import React, { useState } from 'react';
import { FaImage } from "react-icons/fa";

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
      formData.append('file', file);
      try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const responseData = await response.json();
          const signName = responseData.Sign;
          setClassification(signName);
        } else {
          throw new Error('Failed to fetch');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false); // Hide loading after 2 seconds
        }, 2000) // Set loading state to false after API call
      }
    }
  };

  const handleClear = () => {
    setImage(null);
    setClassification(null);
  };

  return (
    <div>
      <h1 className='w-fit text-white px-5 py-3 text-4xl font-merriweather font-normal border rounded-3xl border-violet-800 bg-violet-800 mx-auto mb-12'>
        Know Your Traffic Sign
      </h1>
      <div className='mb-10 w-full'>     
        <input type="file" onChange={handleUpload} accept="image/*" id="upload-img" style={{ display: 'none' }} />
        <label htmlFor="upload-img" className="bg-violet-900 font-merriweather leading-6 text-white px-5 py-3 rounded-2xl text-3xl cursor-pointer shadow-lg duration-200 hover:shadow-violet-500">
          <FaImage className='inline-block mr-3' />Upload Image 
        </label>
        {image && (
          <button onClick={handleClear} className="bg-red-500 text-white font-merriweather px-5 py-3 rounded-2xl text-3xl cursor-pointer shadow-lg duration-200 hover:shadow-red-700 ml-5">
            Clear
          </button>
        )}
      </div>
          {image && <img src={image} alt="Uploaded" className='mx-auto w-96 h-96 rounded-2xl shadow-2xl mb-10'/>}
          {isLoading ? (<p className='text-2xl leading-6 font-merriweather mb-12'>Loading...</p>): classification && <p className='text-2xl leading-6 font-merriweather mb-12 text-violet-400'>Result: {classification}</p>}
    </div>
  );
};

export default TrafficSignClassification;