import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, value, onChange } = props;
  const daysArr = [];

  days.map((currentDay) => {
    return daysArr.push(
      <DayListItem
        key={currentDay.id}
        name={currentDay.name}
        spots={currentDay.spots}
        selected={currentDay.name === value}
        setDay={() => onChange(currentDay.name)}
      />
    );
  })

  return (
    <ul>
      {daysArr}
    </ul>
  )
}