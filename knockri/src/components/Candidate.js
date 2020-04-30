import React, { useState, useEffect } from "react";
import Videos from "./Videos";
import "video-react/dist/video-react.css";

export default function Candidate(props) {
  const {
    application: { videos = [] } = {},
    candidate,
    getQuestions,
    applicationId,
    application,
  } = props;
  const [visibile, setVisible] = useState(false);

  const toggleSelection = () => {
    setVisible(!visibile);
  };
  return (
    <div>
      <h2 onClick={toggleSelection} style={{ cursor: "pointer" }}>
        {candidate}
      </h2>
      {visibile &&
        (videos.length == 0 ? (
          <div
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: "darkred" }}
          >
            This guy does not have any application
          </div>
        ) : (
          <Videos
            getQuestions={getQuestions}
            videos={videos}
            applicationId={applicationId}
            application={application}
          />
        ))}
    </div>
  );
}
