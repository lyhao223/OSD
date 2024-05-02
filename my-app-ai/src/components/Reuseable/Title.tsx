import React from "react";

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <h1 className="w-fit text-white px-5 py-3 text-4xl font-merriweather font-normal border rounded-3xl border-violet-800 bg-violet-800 mx-auto mb-12">
      {text}
    </h1>
  );
};

export default Title;
