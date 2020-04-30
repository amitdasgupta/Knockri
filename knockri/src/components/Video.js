import React, { useState, useEffect } from "react";
import { Player } from "video-react";
import axios from "axios";
import "./components.css";
export default function Video(props) {
  const { video, getQuestions, applicationId, application, index } = props;
  const [comment, setComment] = useState("");
  const renderVideo = () => {
    const { question } = getQuestions(video.questionId);
    return (
      <div className="video-card">
        <div style={{ width: "800px" }}>
          <Player playsInline src={video.src} />
        </div>
        <div style={{ fontSize: "1.5rem", margin: "50px" }}>{question}</div>
        {renderForm()}
      </div>
    );
  };
  const handleChange = (event) => {
    setComment(event.target.value);
  };
  const handleSubmitComment = async (event) => {
    try {
      event.preventDefault();
      application["videos"][index]["comments"] = comment;
      await axios.put(
        `http://localhost:3010/applications/${application.id}`,
        application
      );
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };
  const renderForm = () => {
    return (
      <form onSubmit={handleSubmitComment} className="video-form">
        <input
          type="text"
          onChange={handleChange}
          value={comment}
          placeholder="Enter your comment here"
          style={{ width: "600px", height: "25px" }}
        />
        <button>Save</button>
      </form>
    );
  };
  return <div>{renderVideo()}</div>;
}
