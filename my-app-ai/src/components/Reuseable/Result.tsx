import React from "react";

interface ResultProps {
  children: string;
}

const Result: React.FC<ResultProps> = ({ children }) => {
  return (
    <p className="text-2xl leading-6 font-merriweather mb-12 text-violet-400">
      Result: {children}
    </p>
  );
};

export default Result;
