import SettingsInput from "./SettingsInput";

const SettingsModal = ({ data, closeSettings }) => {
  return (
    <div className="settings-modal">
      <h2>Settings</h2>
      <div className="settings-items">
        {data.map((item) => (
          <SettingsInput
            key={item.label}
            value={item.value}
            setValue={item.setValue}
            label={item.label}
            min={item.min}
            max={item.max}
          />
        ))}
      </div>
      <button className="btn" id="close-settings-btn" onClick={closeSettings}>
        Save & Continue
      </button>
    </div>
  );
};

export default SettingsModal;
