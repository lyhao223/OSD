import React, { ChangeEvent, FC } from "react";

interface FileInputProps {
  handleUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const Input: FC<FileInputProps> = ({ handleUpload, id }) => {
  return (
    <input
      type="file"
      onChange={handleUpload}
      accept="image/*"
      id={id}
      style={{ display: "none" }}
    />
  );
};

export default Input;
