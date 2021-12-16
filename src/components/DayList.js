import React from "react";
import DayListItem from "./DayListItem";

// ---------------- incoming props ---------------- //
// days : Array - a list of day objects (each object includes an id, name, and spots)
// day : String - the currently selected day
// setDay : Function - accepts the name of the day eg. "Monday", "Tuesday"

export default function DayList(props) {
  const DayListItems = props.days.map(day => {
    return <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots} 
      selected={day.name === props.value}
      setDay={props.onChange}
    />
  });
  return (
    <ul>
      {DayListItems}
    </ul>
  );
}