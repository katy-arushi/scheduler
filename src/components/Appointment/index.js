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
import Error from "./Error";

// ---------------- incoming props ---------------- //
// time : String - the time of the appointment (e.g "12pm")
// interviewer : Object - 
// "1": {  
  //   "id": 1,
  //   "name": "Sylvia Palmer",
  //   "avatar": "https://i.imgur.com/LpaY82x.png"
  // },
  // bookInterview : function
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer, isNew) {

    if (!name || !interviewer) {
      transition(ERROR_SAVE)
      return;
    }
    
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview, isNew)
      .then(() => {transition(SHOW)})
      .catch(() => {transition(ERROR_SAVE, true)})
  }

  function deleteAppointment(id) {
    transition(DELETING, true);
    props.cancelInterview(id)
      .then(() => {transition(EMPTY)})
      .catch(() => {transition(ERROR_DELETE, true)})
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header
        time={props.time}>
      </Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => { transition(CONFIRM)}}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          isNew={true}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete this appointment?"}
          onConfirm={() => deleteAppointment(props.id)}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer && props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          isNew={false}
        />
      )}
      {mode === SAVING && (<Status message={"Saving"} />)}
      {mode === DELETING && (<Status message={"Deleting..."} />)}
      {mode === ERROR_SAVE && <Error message="Could not save appointment" onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment" onClose={() => back()} />}
    </article>
  );
}