import React from "react";
import Title from "../Reuseable/Title";
import Button from "../Reuseable/Button";

const Video: React.FC = () => {
  const startVideo = () => {
    window.open("http://127.0.0.3:5003/video_feed", "_blank");
  };

  return (
    <section className="min-h-[400px] mx-auto  p-6 " id="Function">
      <Title text="Video Stream" />
      <Button
        onClick={startVideo}
        classesBG="bg-violet-900"
        classesHV="hover:shadow-violet-500">
        Start Video
      </Button>
    </section>
  );
};

export default Video;
