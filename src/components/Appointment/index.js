import React from "react";
import "./styles.scss";
import classNames from "classnames";

export default function Appointment(props) {

  const appointments = (time) => {
    if (time === undefined) {
      return "No Appointments"
    }
    return `Appointment at ${time} `;
  }
  
  return (
    <article className="appointment">
      {appointments(props.time)}
    </article>
  );
} 