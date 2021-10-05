import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss"

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  const interviewersArray = [];
  
  interviewers.map(currentInterviewer => {
    return interviewersArray.push(
      <InterviewerListItem
      key={currentInterviewer.id}
      name={currentInterviewer.name}
      avatar={currentInterviewer.avatar}
      selected={currentInterviewer.id === value}
      setInterviewer={() => onChange(currentInterviewer.id)}
      />
      );
    });
    
    return (
      <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewersArray}
      </ul>
    </section>
  );
};

