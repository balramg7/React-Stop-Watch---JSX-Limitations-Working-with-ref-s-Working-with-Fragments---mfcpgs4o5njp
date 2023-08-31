import { useRef, useState } from "react";
import "./App.css";

function App() {
const [time, setTime] = useState(0);
const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); 
      }, 10);
    }
};

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const lapTimer = () => {
    const formattedTime = (time / 1000).toFixed(3); // Convert to seconds and format
    setLaps((prevLaps) => [...prevLaps, formattedTime]);
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
    setLaps([]);
  };

  return (
    <div className="App">
      <h1>Stopwatch App</h1>
      <div className="stopwatch">
        <p className="time">{(time / 1000).toFixed(3)}</p>
        <div className="buttons">
          <button onClick={startTimer}>START</button>
          <button onClick={stopTimer}>STOP</button>
          <button onClick={lapTimer}>LAP</button>
          <button onClick={resetTimer}>RESET</button>
        </div>
      </div>
      <div className="lap-section">
        {laps.length > 0 && (
          <div className="laps">
            <h2>Lap Times</h2>
            <ul>
              {laps.map((lapTime, index) => (
                <li key={index}>{lapTime} s</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
