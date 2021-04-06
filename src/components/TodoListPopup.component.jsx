import React, { Fragment, useEffect, useState } from "react";
import "./todoListPopup.css";
import Calendar from "react-calendar";

const TodoListPopup = ({ date, trigger, handleClose, checkListOriginal, updateRaceEvent }) => {
  const [checkList, setCheckList] = useState([]);

  useEffect(() => {
    if (date) {
      setCheckList(
        checkListOriginal || [
          { id: 1, value: "tyres", date: null, isCalendarOpen: false },
          { id: 2, value: "food", date: null, isCalendarOpen: false },
          { id: 3, value: "Change Shock Oils", date: null, isCalendarOpen: false },
          { id: 4, value: "Beer", date: null, isCalendarOpen: false },
          { id: 5, value: "Sandwich", date: null, isCalendarOpen: false },
        ]
      );
    }
  }, [date]);

  function handleConfirm() {
    updateRaceEvent(date, checkList);
    handleClose();
  }

  if (!trigger) {
    return null;
  }

  const deleteTask = (indexCheckListItem) => {
    const newCL = checkList.filter((v, iv) => {
      return iv !== indexCheckListItem;
    });

    setCheckList(newCL);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h1>{date}</h1>

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
                  }}
                  value={checkListItem.date || null}
                />
              ) : (
                <Fragment>
                  <button onClick={() => deleteTask(indexCheckListItem)}>Delete</button>
                  <div
                    onClick={() => {
                      const newCheckListItem = checkList.map((v, i) => {
                        if (i === indexCheckListItem) {
                          return { ...v, isCalendarOpen: true };
                        }
                        return { ...v, isCalendarOpen: false };
                      });
                      console.log(indexCheckListItem);
                      setCheckList(newCheckListItem);
                    }}
                    className="date"
                  >
                    {checkListItem.date || "Please set date"}
                  </div>
                </Fragment>
              )}
            </li>
          ))}
        </ul>
        <div className="popup-action">
          <button className="confirm" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="close" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoListPopup;
