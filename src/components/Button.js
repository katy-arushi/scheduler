import React from "react";
import "components/Button.scss";
import classNames from "classnames";

// ---------------- incoming props ---------------- //
// confirm : Boolean - to set conditional CSS styles
// danger : Boolean - to set conditional CSS styles
// disabled : Boolean - to set conditional CSS styles
// onClick : function - to run when a user clicks on the button. event handler

export default function Button(props) {
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
