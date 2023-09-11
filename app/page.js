"use client";
import React, { useRef, useState } from "react";

function Home() {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const startTimer = () => {
    if (!intervalRef.current) {
      startTime.current = Date.now() - currentTime;
      intervalRef.current = setInterval(updateTime, 10);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const recordLap = () => {
    if (intervalRef.current) {
      const lapTime = (Date.now() - startTime.current) / 1000;
      setLaps((prevLaps) => [...prevLaps, lapTime.toFixed(3)]);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setCurrentTime(0);
    setLaps([]);
  };

  const updateTime = () => {
    setCurrentTime((Date.now() - startTime.current) / 1000);
  };

  return (
    <div id="main">
      <section>
        <h1 className="seconds-elapsed">{currentTime.toFixed(3)}</h1>
        <section className="buttons">
          <button className="start-btn" onClick={startTimer}>
            START
          </button>
          <button className="stop-btn" onClick={stopTimer}>
            STOP
          </button>
          <button className="lap-btn" onClick={recordLap}>
            LAP
          </button>
          <button className="reset-btn" onClick={resetTimer}>
            RESET
          </button>
        </section>
      </section>
      <section className="lap-section">
        <h2>Laps</h2>
        <section className="laps">
          {laps.map((lap, index) => (
            <p key={index}>
              lap {index + 1}: {lap} seconds
            </p>
          ))}
        </section>
      </section>
    </div>
  );
}

export default Home;