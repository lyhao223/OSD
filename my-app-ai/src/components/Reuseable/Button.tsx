import React, { MouseEventHandler } from "react";

interface ClearButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  classesBG: string;
  classesHV: string;
  children?: React.ReactNode;
}

const Button: React.FC<ClearButtonProps> = ({
  onClick,
  classesBG,
  classesHV,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${classesBG} text-white font-merriweather px-5 py-3 rounded-2xl text-xl md:text-3xl cursor-pointer shadow-lg duration-200 ${classesHV} ml-5`}>
      {children}
    </button>
  );
};

export default Button;
