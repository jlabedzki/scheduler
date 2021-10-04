import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
// import Error from "./Error";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const CONFIRM = "CONFIRM";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);


  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVE);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  };

  

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {
            props.cancelInterview(props.id)
              .then(transition(CONFIRM));
          }}
        />
      )}
      {mode === EMPTY && 
        <Empty 
          onAdd={() => transition(CREATE)} 
          
        />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
        // onSave={() => }
          save={save}
        />
      )}
      {mode === SAVE && <Status />}
      {mode === CONFIRM && <Confirm />}

    </article>
  );
};