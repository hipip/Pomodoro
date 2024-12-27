import { useEffect, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleStop } from "@fortawesome/free-regular-svg-icons";
import SettingsToggleBtn from "./components/SettingsToggleBtn";
import SettingsModal from "./components/SettingsModal";

function App() {
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [time, setTime] = useState(pomodoro * 60);
  const [mode, setMode] = useState("Pomodoro");
  const [isOn, setIsOn] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mainColor, setMainColor] = useState("#D42C2F");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [bgImgUrl, setBgImgUrl] = useState(
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const closeSettings = () => setIsSettingsOpen(false);

  const timeSetter = () => {
    if (mode === "Pomodoro") setTime(pomodoro * 60);
    else if (mode === "Short Break") setTime(shortBreak * 60);
    else setTime(longBreak * 60);
  };

  useEffect(() => {
    if (mode === "Pomodoro") {
      setMainColor("#D42C2F");
      setBgImgUrl(
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      );
    } else {
      setMainColor("#00BCC2");
      setBgImgUrl(
        "https://images.unsplash.com/photo-1432889490240-84df33d47091?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      );
    }
  }, [mode]);

  useEffect(() => {
    if (isOn && time !== 0 && !isPaused) {
      const key = setTimeout(() => {
        setTime((time) => time - 1);
      }, 1000);

      return () => {
        clearTimeout(key);
      };
    }
    if (time === 0) {
      setIsOn(false);
    }
  }, [isOn, isPaused, time]);

  return (
    <div className="App" style={{ backgroundImage: `url(${bgImgUrl})` }}>
      <div className="pomodoro-container">
        {!isOn && (
          <>
            {isSelectOpen && (
              <div className="select-container">
                <button
                  type="button"
                  id="mode-pomodoro-btn"
                  className="btn"
                  onClick={() => {
                    setMode("Pomodoro");
                    setIsSelectOpen(false);
                  }}
                >
                  Pomodoro
                </button>
                <button
                  type="button"
                  id="mode-short-break-btn"
                  className="btn"
                  onClick={() => {
                    setMode("Short Break");
                    setIsSelectOpen(false);
                  }}
                >
                  Short Break
                </button>
                <button
                  type="button"
                  id="mode-long-break-btn"
                  className="btn"
                  onClick={() => {
                    setMode("Long Break");
                    setIsSelectOpen(false);
                  }}
                >
                  Long Break
                </button>
              </div>
            )}
            <button
              id="mode-select-btn"
              className="btn"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              {mode}{" "}
              <FontAwesomeIcon icon={isSelectOpen ? faCaretUp : faCaretDown} />
            </button>
            <button
              className="btn"
              id="start-btn"
              onClick={() => {
                setIsOn(true);
                setIsPaused(false);
                timeSetter();
              }}
            >
              <FontAwesomeIcon icon={faPlay} />
            </button>
          </>
        )}
        {isOn && (
          <>
            <h3>{mode}</h3>
            <h1 className="timer-time">
              {String(Math.floor(time / 60)).padStart(2, "0")}:
              {String(time % 60).padStart(2, "0")}
            </h1>
            <div className="btns-container">
              <button
                type="button"
                className="btn"
                id="pause-resume-timer-btn"
                onClick={() => {
                  setIsPaused(!isPaused);
                }}
              >
                <FontAwesomeIcon icon={isPaused ? faPlay : faPause} />
              </button>
              <button
                type="button"
                className="btn"
                id="stop-timer-btn"
                onClick={() => {
                  setIsOn(false);
                }}
              >
                <FontAwesomeIcon icon={faCircleStop} />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="bg-overlay" style={{ backgroundColor: mainColor }}></div>
      <SettingsToggleBtn toggleSettings={toggleSettings} />
      {isSettingsOpen && (
        <SettingsModal
          data={[
            {
              value: pomodoro,
              setValue: setPomodoro,
              label: "Pomodoro Duration",
              min: 1,
              max: 120,
            },
            {
              value: shortBreak,
              setValue: setShortBreak,
              label: "Short Break Duration",
              min: 1,
              max: 20,
            },
            {
              value: longBreak,
              setValue: setLongBreak,
              label: "Long Break Duration",
              min: 1,
              max: 20,
            },
          ]}
          closeSettings={closeSettings}
        />
      )}
    </div>
  );
}

export default App;
