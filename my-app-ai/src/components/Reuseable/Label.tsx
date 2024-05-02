import React from "react";
import { FaImage } from "react-icons/fa";
interface htmlForProps {
  htmlFor: string;
}
const UploadLabel: React.FC<htmlForProps> = ({ htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="bg-violet-900 font-merriweather leading-6 text-white px-5 py-3 rounded-2xl text-xl md:text-3xl cursor-pointer shadow-lg duration-200 hover:shadow-violet-500">
      <FaImage className="inline-block mr-3" />
      Upload Image
    </label>
  );
};

export default UploadLabel;
