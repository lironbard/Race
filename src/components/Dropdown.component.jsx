import React from "react";

const Dropdown = ({ hours }) => {
  const renderOptions = options.map((hour) => {
    return (
      <div key={hour.value} className="item">
        {option.time}
      </div>
    );
  });

  return (
    <div className="ui form">
      <div className="field">
        <label className="label">Select an hour</label>
        <div className="ui selection dropdown visible active">
          <i className="dropdown icon"></i>
          <div className="text"></div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
