import React, { useEffect, useState } from "react";
import "./todoListPopup.css";
import Calendar from "react-calendar";

const TodoListPopup = ({ date, trigger, handleClose, checkListOriginal, handleCheckDate }) => {
  const [checkList, setCheckList] = useState([]);
  const [todoList, setTodoList] = useState([]);

  // useEffect(() => {}, [
  //   setCheckList(
  //     checkListOriginal || [
  //       { value: "tyres", date: null, isCalendarOpen: false },
  //       { value: "food", date: null, isCalendarOpen: false },
  //       { value: "Change Shock Oils", date: null, isCalendarOpen: false },
  //       { value: "Beer", date: null, isCalendarOpen: false },
  //       { value: "Sandwich", date: null, isCalendarOpen: false },
  //     ]
  //   ),
  // ]);

  if (!trigger) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <h1>{date}</h1>
        <button className="close-btn" onClick={handleClose}>
          Close
        </button>
        <ul>
          {checkList.map((checkListItem, indexCheckListItem) => (
            <li key={indexCheckListItem}>
              <div className="value">{checkListItem.value}</div>
              {checkListItem.isCalendarOpen ? (
                <Calendar
                  calendarType="US"
                  onClickDay={(value, event) => {
                    console.log({ checkListItem, value });
                    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
                    const stringDate = new Date(value).toLocaleDateString("en-GB", options);

                    const newCheckListItem = checkList.map((v, i) => {
                      if (i === indexCheckListItem) {
                        return { ...v, date: stringDate, isCalendarOpen: false };
                      }
                      return v;
                    });

                    setCheckList(newCheckListItem);
                    handleCheckDate(date, newCheckListItem);
                  }}
                  value={checkListItem.date || null}
                />
              ) : (
                <div
                  onClick={() => {
                    const newCheckListItem = checkList.map((v, i) => {
                      if (i === indexCheckListItem) {
                        return { ...v, isCalendarOpen: true };
                      }
                      return { ...v, isCalendarOpen: false };
                    });

                    setCheckList(newCheckListItem);
                  }}
                  className="date"
                >
                  {checkListItem.date || "Please set date"}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoListPopup;
