import { useEffect, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faPlay } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [pomodoro, setPomodoro] = useState(25);
  const [time, setTime] = useState(pomodoro * 60);
  const [mode, setMode] = useState("Pomodoro");
  const [isOn, setIsOn] = useState(false);
  const [isPaused, setIsPause] = useState(false);
  const [mainColor, setMainColor] = useState("#D42C2F");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);

  const [bgImgUrl, setBgImgUrl] = useState(
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

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
              onClick={() => setIsSelectOpen(true)}
            >
              {mode} <FontAwesomeIcon icon={faCaretDown} />
            </button>
            <button
              className="btn"
              id="start-btn"
              onClick={() => setIsOn(true)}
            >
              <FontAwesomeIcon icon={faPlay} />
            </button>
          </>
        )}
      </div>
      <div className="bg-overlay" style={{ backgroundColor: mainColor }}></div>
    </div>
  );
}

export default App;
