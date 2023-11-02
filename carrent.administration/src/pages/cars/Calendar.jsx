import React, { useState } from "react";
import "./Calendar.css";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(<div className="calendar-cell empty"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(<div className="calendar-cell">{day}</div>);
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        {daysOfWeek.map((day) => (
          <div className="calendar-cell header-cell">{day}</div>
        ))}
      </div>
      <div className="calendar-body">{calendarCells}</div>
    </div>
  );
}

export default Calendar;
