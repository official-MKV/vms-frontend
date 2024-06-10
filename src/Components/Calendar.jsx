// src/components/Calendar.js

import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  subMonths,
  addMonths,
} from "date-fns";

const Calendar = ({ events, onDateClick }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const days = [];

  let day = startDate;
  let formattedDate = "";

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleClick = (day) => {
    if (onDateClick) {
      onDateClick(day);
    }
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);

      days.push(
        <div
          className={`p-2 text-[10px] font-bold rounded-[5px] flex flex-col items-center justify-center  cursor-pointer
          ${!isSameMonth(day, monthStart) ? "text-gray-400" : ""}
          ${isSameDay(day, new Date()) ? "bg-[#4285F41A]" : ""}
          ${events && events[format(day, "yyyy-MM-dd")] ? "bg-[#47B399]" : ""}`}
          key={day}
          onClick={() => handleClick(day)}
        >
          <span>{formattedDate}</span>
        </div>
      );
      day = addDays(day, 1);
    }
  }

  return (
    <div className="w-1/2  bg-[white] p-[10px] rounded-[10px]">
      <div className="flex justify-between items-center my-4">
        <button onClick={prevMonth} className="text-xl">
          &lt;
        </button>
        <span className="text-xl font-bold">
          {format(currentDate, "MMMM yyyy")}
        </span>
        <button onClick={nextMonth} className="text-xl">
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div className="text-center font-bold" key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{days}</div>
    </div>
  );
};

export default Calendar;
