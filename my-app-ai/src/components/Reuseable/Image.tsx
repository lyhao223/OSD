import React from "react";

interface ResultProps {
  src: string;
}

const Image: React.FC<ResultProps> = ({ src }) => {
  return (
    <img
      src={src}
      alt="Uploaded"
      className="mx-auto w-96 h-96 rounded-2xl shadow-2xl mb-10"
    />
  );
};

export default Image;
