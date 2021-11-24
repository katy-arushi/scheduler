import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

// ---------------- incoming props ---------------- //
// interviewers : Array - an array of objects as seen above
// setInterviewer : Function - a function that accepts an interviewer id. This function will simply be passed down to the <InterviewerListItem>
// interviewer : Number - a number that represents the id of the currently selected interviewer


export default function InterviewerList(props) {
  
  const interviewersList = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className="interviewers__list">
        {interviewersList}
      </ul>
    </section>
  );
}