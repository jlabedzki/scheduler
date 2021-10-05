import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const { onCancel, onSave } = props;

  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    // if (interviewer === null) {
    //   setError("Please select an interviewer")
    //   return;
    // }
    setError("");
    onSave(name, interviewer);
  };

  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    onCancel();
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => setName(e.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer} 
          onChange={setInterviewer} />
        {/* {!interviewer && <section className="appointment__validation">{error}</section>} */}
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};