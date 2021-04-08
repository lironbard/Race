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
  const [raceEvents, setRaceEvents] = useState({});
  const raceEventsDates = Object.keys(raceEvents);

  function updateRaceEvent(date, value) {
    const newRaceEvents = { ...raceEvents, [date]: value };
    setRaceEvents(newRaceEvents);
  }

  function handleDeleteRace(date) {
    const newRceEvents = { ...raceEvents };
    delete newRceEvents[date];
    setRaceEvents(newRceEvents);
  }

  function handleDeleteRaceTask(raceEventsDate, indexTask) {
    const newCheckList = raceEvents[raceEventsDate].filter((v, iv) => {
      return iv !== indexTask;
    });

    setRaceEvents({ ...raceEvents, [raceEventsDate]: newCheckList });
  }

  return (
    <div className="body">
      <div className="calendar">
        <TodoListPopup
          updateRaceEvent={updateRaceEvent}
          checkListOriginal={raceEvents[activeDate]}
          trigger={buttonPopUp}
          date={activeDate}
          handleClose={() => setButtonPopUp(false)}
          // PopUp End
        />

        <Calendar
          calendarType="US"
          onChange={setValue}
          onClickDay={(value, event) => {
            setIsInput((isInput) => !isInput);
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
        {/* {value && <input type="text" />} */}

        <div>
          <h1 className="raceTitle">Race Events:</h1>
          <ul className="cards">
            {raceEventsDates.map((raceEventsDate) => (
              <li>
                <div>date: {raceEventsDate}</div>
                <div>
                  Check List
                  <ul>
                    {raceEvents[raceEventsDate].map(({ value, date: checkListDate }, indexTask) => (
                      <li>
                        <div>{value}</div>
                        <div>{checkListDate}</div>
                        <button onClick={() => handleDeleteRaceTask(raceEventsDate, indexTask)}>Delete Task</button>
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => handleDeleteRace(raceEventsDate)}>Delete Race</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
