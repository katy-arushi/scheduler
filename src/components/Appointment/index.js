import React from "react";
import "./styles.scss";
import useVisualMode from '../../hooks/useVisualMode';

// component imports
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

// ---------------- incoming props ---------------- //
// time : String - the time of the appointment (e.g "12pm")
// interviewer : Object - 
// "1": {  
//   "id": 1,
//   "name": "Sylvia Palmer",
//   "avatar": "https://i.imgur.com/LpaY82x.png"
// },
// bookInterview : function

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
  }

  function deleteAppointment(id) {
    transition(DELETING);
    props.cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
  }

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
          onDelete={() => { transition(CONFIRM) }}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && (<Status message={"Saving"} />)}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure?"}
          onConfirm={() => deleteAppointment(props.id)}
          onCancel={back}
        />
      )}
      {mode === DELETING && (<Status message={"Deleting..."}/>)}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
    </article>
  );
}