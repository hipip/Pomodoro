import { useEffect, useReducer, useState } from "react";
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
  const [mainColor, setMainColor] = useState("#D42C2F");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const pomodoroReducer = (state, action) => {
    switch (action.type) {
      case "set-time-to-mode": {
        const time =
          state.mode === "pomodoro"
            ? state.pomodoro * 60
            : state.mode === "short break"
            ? state.shortBreak * 60
            : state.longBreak * 60;
        return { ...state, time };
      }
      case "set-time": {
        return { ...state, time: action.value };
      }
      case "start": {
        return { ...state, isActive: true, isPaused: false };
      }
      case "pause": {
        return { ...state, isPaused: true };
      }
      case "resume": {
        return { ...state, isPaused: false };
      }
      case "stop": {
        return { ...state, isActive: false, isPaused: false };
      }
      case "set-mode": {
        return { ...state, mode: action.mode };
      }
      case "set-pomodoro": {
        return { ...state, pomodoro: action.value };
      }
      case "set-short-break": {
        return { ...state, shortBreak: action.value };
      }
      case "set-long-break": {
        return { ...state, longBreak: action.value };
      }
    }
  };

  const [pomodoroState, pomodoroDispatch] = useReducer(pomodoroReducer, {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    time: 25 * 60,
    mode: "pomodoro",
    isActive: false,
    isPaused: false,
  });

  const [bgImgUrl, setBgImgUrl] = useState(
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const closeSettings = () => setIsSettingsOpen(false);

  useEffect(() => {
    if (pomodoroState.mode === "pomodoro") {
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
  }, [pomodoroState.mode]);

  useEffect(() => {
    let intervalKey;

    if (pomodoroState.isActive && !pomodoroState.isPaused) {
      const endTime = Date.now() + pomodoroState.time * 1000;

      intervalKey = setInterval(() => {
        const remainingTime = Math.max(
          0,
          Math.round((endTime - Date.now()) / 1000)
        );

        pomodoroDispatch({ type: "set-time", value: remainingTime });

        if (remainingTime === 0) {
          clearInterval(intervalKey);
          pomodoroDispatch({ type: "stop" });

          if (pomodoroState.mode === "pomodoro") {
            pomodoroDispatch({ type: "set-mode", mode: "short break" });
            pomodoroDispatch({ type: "set-time-to-mode" });
            pomodoroDispatch({ type: "start" });
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalKey);
    };
  }, [pomodoroState.isActive, pomodoroState.isPaused, pomodoroState.time]);

  useEffect(() => {
    document.title = formatTime(pomodoroState.time);
  }, [pomodoroState.time]);

  return (
    <div className="App" style={{ backgroundImage: `url(${bgImgUrl})` }}>
      <div className="pomodoro-container">
        {!pomodoroState.isActive && (
          <>
            {isSelectOpen && (
              <div className="select-container">
                <button
                  type="button"
                  id="mode-pomodoro-btn"
                  className="btn"
                  onClick={() => {
                    pomodoroDispatch({ type: "set-mode", mode: "pomodoro" });
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
                    pomodoroDispatch({ type: "set-mode", mode: "short break" });
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
                    pomodoroDispatch({ type: "set-mode", mode: "long break" });
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
              {pomodoroState.mode}{" "}
              <FontAwesomeIcon icon={isSelectOpen ? faCaretUp : faCaretDown} />
            </button>
            <button
              className="btn"
              id="start-btn"
              onClick={() => {
                pomodoroDispatch({ type: "set-time-to-mode" });
                pomodoroDispatch({ type: "start" });
              }}
            >
              <FontAwesomeIcon icon={faPlay} />
            </button>
          </>
        )}
        {pomodoroState.isActive && (
          <>
            <h3>{pomodoroState.mode}</h3>
            <h1 className="timer-time">{formatTime(pomodoroState.time)}</h1>
            <div className="btns-container">
              <button
                type="button"
                className="btn"
                id="pause-resume-timer-btn"
                onClick={() => {
                  pomodoroDispatch({
                    type: pomodoroState.isPaused ? "resume" : "pause",
                  });
                }}
              >
                <FontAwesomeIcon
                  icon={pomodoroState.isPaused ? faPlay : faPause}
                />
              </button>
              <button
                type="button"
                className="btn"
                id="stop-timer-btn"
                onClick={() => {
                  pomodoroDispatch({ type: "stop" });
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
              value: pomodoroState.pomodoro,
              setValue: (value) =>
                pomodoroDispatch({ type: "set-pomodoro", value }),
              label: "Pomodoro Duration",
              min: 1,
              max: 120,
            },
            {
              value: pomodoroState.shortBreak,
              setValue: (value) =>
                pomodoroDispatch({ type: "set-short-break", value }),
              label: "Short Break Duration",
              min: 1,
              max: 20,
            },
            {
              value: pomodoroState.longBreak,
              setValue: (value) =>
                pomodoroDispatch({ type: "set-long-break", value }),
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
