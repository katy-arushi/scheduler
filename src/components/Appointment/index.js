import React from "react";
import "./styles.scss";
//import classNames from "classnames";
import useVisualMode from '../../hooks/useVisualMode';

// component imports
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

// ---------------- incoming props ---------------- //
// time : String - the time of the appointment (e.g "12pm")
// interviewer : Object - 
      // "1": {  
      //   "id": 1,
      //   "name": "Sylvia Palmer",
      //   "avatar": "https://i.imgur.com/LpaY82x.png"
      // },

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  return (
    <article className="appointment">
      <Header
        time={props.time}>
      </Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          // student={props.interview.student}
          // interviewer={props.interview.interviewer}
          interviewers={[]}
          onCancel={back}
        />
      )}
    </article>
  );
} 