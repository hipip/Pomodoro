import React from "react";

const SettingsInput = ({ min = 1, max = 120, value, setValue, label }) => {
  return (
    <div className="settings-item">
      <div className="settings-item-labels">
        <label>{label}</label>
        <p className="settings-value">{value} mintues</p>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        min={min}
        max={max}
      />
    </div>
  );
};

export default SettingsInput;
