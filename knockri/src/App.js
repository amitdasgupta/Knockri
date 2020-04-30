import React, { Component } from "react";
import _isEmpty from "lodash";
import axios from "axios";
import Candidate from "./components/Candidate";
import "./App.css";
class App extends React.Component {
  state = {
    candidates: {},
    questions: {},
    applications: {},
  };
  async fetchData() {
    try {
      const candiatesAsync = axios.get("http://localhost:3010/candidates");
      const questionsAsync = axios.get("http://localhost:3010/questions");
      const applicationsAsync = axios.get("http://localhost:3010/applications");
      const data = await Promise.all([
        candiatesAsync,
        questionsAsync,
        applicationsAsync,
      ]);
      const candiates = data[0].data;
      const applications = data[2].data;
      const questions = data[1].data;
      this.transformData(candiates, "candidates");
      this.transformData(applications, "applications");
      this.transformData(questions, "questions");
    } catch (error) {
      console.log(error);
    }
  }

  transformData(data, type) {
    const transformedData = {};
    for (let item of data) {
      transformedData[item.id] = item;
    }
    this.setState({
      [type]: transformedData,
    });
  }
  componentDidMount() {
    if (
      _isEmpty(this.state.applications) ||
      _isEmpty(this.state.candidates) ||
      _isEmpty(this.state.questions)
    ) {
      this.fetchData();
      console.log("calling api");
    }
  }

  getQuestions = (questionId) => {
    return this.state.questions[questionId] || {};
  };

  getApplications() {}

  render() {
    const { candidates, applications } = this.state;
    return (
      <div className="main">
        <h1>Candidates</h1>
        {Object.values(candidates).map((item, index) => {
          const application = applications[item.applicationId] || {};
          return (
            <Candidate
              key={index}
              candidate={item.name}
              application={application}
              getQuestions={this.getQuestions}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
