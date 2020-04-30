import React from "react";
import Video from "./Video";
import "./components.css";
export default function Videos(props) {
  const { videos = [], getQuestions, applicationId, application } = props;
  const getCard = (video, index) => (
    <Video
      className="video-list"
      video={video}
      key={index}
      getQuestions={getQuestions}
      applicationId={applicationId}
      application={application}
      index={index}
    />
  );
  return <div>{videos.map((item, index) => getCard(item, index))}</div>;
}
