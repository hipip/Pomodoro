import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SettingsToggleBtn = ({ toggleSettings }) => {
  return (
    <button id="toggle-settings-btn" onClick={toggleSettings}>
      <FontAwesomeIcon icon={faGear} />
    </button>
  );
};

export default SettingsToggleBtn;
