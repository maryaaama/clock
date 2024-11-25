import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';


function Clock25() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isSession, setIsSession] = useState(true);
  const beepRef = useRef();

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(sessionLength * 60);
    }
  }, [sessionLength, breakLength]);

  useEffect(() => {
    if (isRunning) {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {  
                      beepRef.current.play(); 
                    if (isSession) {
                        setIsSession(false);
                        return breakLength * 60;
                    } else {
                        setIsSession(true);
                        return sessionLength * 60; 
                    }
                }
                return prev - 1; 
            });
        }, 1000);

        return () => clearInterval(timer); 
    }
}, [isRunning, isSession, breakLength, sessionLength]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const stopStart = () => {
    setIsRunning(!isRunning);
};

const resetHandler = () => {
  setIsRunning(false);
  setBreakLength(5);
  setSessionLength(25);
  setTimeLeft(25 * 60);
  setIsSession(true);

  
};
  const decremetBreak = () => {
    if (!isRunning && breakLength > 1) {
      setBreakLength((prev) => Math.max(1, prev - 1));
    }
  };

  const incremetBreak = () => {
    if (!isRunning && breakLength < 60) {
      setBreakLength((prev) => Math.min(60, prev + 1));
    }
  };

  const decremetSession = () => {
    if (!isRunning && sessionLength > 1) {
      setSessionLength((prev) => Math.max(1, prev - 1));
      
    }
  };

  const incremetSession = () => {
    if (!isRunning && sessionLength < 60) {
      setSessionLength((prev) => Math.min(60, prev + 1));
      
    }
  };

  return (
    <div bg="light" border="primary" className="d-flex flex-column align-items-center">
      <span className="mb-5 mt-5 fs-2">25 + 5 Clock by maryam</span>
      <div className="row">
        <div id="break-length" className="col fs-2 fw-bold">
          <p>Break Length</p>
          <div className="row gx-0">
            <Button
              onClick={decremetBreak}
              id="break-decrement"
              className="col p-0"
              variant="link"
            >
              <i className="bi bi-arrow-down-square fs-2"></i>
            </Button>
            <span className="col p-0">{breakLength}</span>
            <Button
              onClick={incremetBreak}
              id="break-increment"
              className="col p-0"
              variant="link"
            >
              <i className="bi bi-arrow-up-square fs-2"></i>
            </Button>
          </div>
        </div>
        <div id="session-length" className="col fs-2 fw-bold">
          <p style={{ width: '15rem' }}>Session Length</p>
          <div className="row">
            <Button
              onClick={decremetSession}
              id="session-decrement"
              className="col p-0"
              variant="link"
            >
              <i className="bi bi-arrow-down-square fs-2"></i>
            </Button>
            <span className="col p-0">{sessionLength}</span>
            <Button
              onClick={incremetSession}
              id="session-increment"
              className="col p-0"
              variant="link"
            >
              <i className="bi bi-arrow-up-square fs-2"></i>
            </Button>
          </div>
        </div>
      </div>
      <div
        id="timer-label"
        className="border border-5 rounded-pill border-primary mt-5 d-flex flex-column justify-content-center"
        style={{ width: '15rem' }}
      >
        <h3>{isSession ? 'Session' : 'Break'}</h3>
        <span id="time-left" className=' fs-2'>{formatTime(timeLeft)}</span>
      </div>
      <div className="d-flex flex-row mt-2">
        <Button onClick={stopStart} id="start_stop" variant="link">
          <i className="bi bi-skip-start-btn-fill fs-2"></i>
          <i className="bi bi-stop-btn-fill fs-2"></i>
        </Button>
        <Button onClick={resetHandler} id="reset" variant="link">
          <i className="bi bi-arrow-clockwise fs-2"></i>
        </Button>
      </div>
      <audio id="beep" ref={beepRef} src="/beep-125033.mp3"  preload="auto" ></audio>
    </div>
  );
}

export default Clock25;
