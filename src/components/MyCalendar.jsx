import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./myCalendar.css";
import { Link, Redirect } from "react-router-dom";
import TodoListPopup from "./TodoListPopup.component";

function MyCalendar(props) {
  const [value, setValue] = useState(new Date());
  const [activeDate, setActiveDate] = useState(null);
  const [lastId, setLastId] = useState(0);
  const [isInput, setIsInput] = useState(false);
  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [checkListDates, setCheckListDates] = useState({});

  function handleCheckDate(date, value) {
    const newCheckListDates = { ...checkListDates, [date]: value };
    setCheckListDates(newCheckListDates);
  }

  return (
    <div>
      <TodoListPopup checkListOriginal={checkListDates[activeDate]} handleCheckDate={handleCheckDate} trigger={buttonPopUp} date={activeDate} handleClose={() => setButtonPopUp(false)} />

      <Calendar
        calendarType="US"
        onChange={setValue}
        onClickDay={(value, event) => {
          console.log({ value });
          setIsInput((isInput) => !isInput);
          console.log(event.currentTarget);
          event.currentTarget.firstElementChild.classList.toggle("selectedDay");
          props.setDatesList((datesList) => {
            const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
            const stringDate = new Date(value).toLocaleDateString("en-GB", options);
            setActiveDate(stringDate);
            const dayDetails = { id: lastId + 1, date: stringDate };
            setLastId(lastId + 1);
            return [...datesList, dayDetails];
          });
          setButtonPopUp(true);
          console.dir(value);
        }}
        value={value}
      />
      {value && <input type="text" />}
    </div>
  );
}

export default MyCalendar;

//    Date: [
//   { value: "tyres", date: null, isCalendarOpen: false },
//   { value: "food", date: null, isCalendarOpen: false },
//   { value: "Change Shock Oils", date: null, isCalendarOpen: false },
//   { value: "Beer", date: null, isCalendarOpen: false },
//   { value: "Sandwich", date: null, isCalendarOpen: false },
// ],
