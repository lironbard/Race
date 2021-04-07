import React, { Fragment, useEffect, useState } from "react";
import "./todoListPopup.css";
import Calendar from "react-calendar";

const TodoListPopup = ({ date, trigger, handleClose, checkListOriginal, updateRaceEvent }) => {
  const [checkList, setCheckList] = useState([]);

  useEffect(() => {
    if (date) {
      setCheckList(
        checkListOriginal || [
          { id: 1, value: "Register to the 16.4.21 race", date: null, isCalendarOpen: false },
          { id: 2, value: "Prepare Tiers", date: null, isCalendarOpen: false },
          { id: 3, value: "Charge up the controller", date: null, isCalendarOpen: false },
          { id: 4, value: "Change Shocks Oil", date: null, isCalendarOpen: false },
          { id: 5, value: "Clean & Tune the engine", date: null, isCalendarOpen: false },
          { id: 6, value: "Put in a new clutch", date: null, isCalendarOpen: false },
          { id: 7, value: "Take the SPARE parts bag", date: null, isCalendarOpen: false },
          { id: 8, value: "Beer", date: null, isCalendarOpen: false },
          { id: 9, value: "Sandwich", date: null, isCalendarOpen: false },
          { id: 10, value: "Hat & Sunscreen", date: null, isCalendarOpen: false },
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

  const Line = ({ checkListItem, indexCheckListItem }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [txt, setEditedText] = useState(checkListItem.value);
    const [line, setLine] = useState();

    return (
      <li key={indexCheckListItem.checkListItem}>
        {/* No To String */}
        <div className="value">
          {isEdit ? (
            <div>
              <input
                type="text"
                value={txt}
                onChange={(e) => {
                  setEditedText(e.target.value);
                }}
              />
              <button
              // onClick={() => {
              //   updateRaceEvent(date, txt);
              //   setIsEdit(false);
              //   setCheckList;
              // }}
              >
                {" "}
                SAVE
              </button>
            </div>
          ) : (
            <div
              onClick={() => {
                setIsEdit(true);
              }}
            >
              <label>{txt}</label>
            </div>
          )}
        </div>

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
    );
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h1>{date}</h1>

        <ul>
          {checkList.map((checkListItem, indexCheckListItem) => (
            <Line checkListItem={checkListItem} indexCheckListItem={indexCheckListItem} />
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
