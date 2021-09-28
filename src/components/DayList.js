import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;
  const daysArr = [];
  days.map((currentDay) => {
    daysArr.push(
      <DayListItem
        key={currentDay.id}
        name={currentDay.name}
        spots={currentDay.spots}
        selected={currentDay.name === day}
        setDay={setDay}
      />
    );
  })

  return (
    <ul>
      {daysArr}
    </ul>
  )
}