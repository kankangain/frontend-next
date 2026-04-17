import React, { useState, useEffect, useCallback } from 'react';
import './GlassCard.css'; // See CSS below

const INITIAL_TIME = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const GlassCountdown = ({ targetMs }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = targetMs - Date.now();
    let timeLeft = INITIAL_TIME;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [targetMs]);

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const timerComponents = ['days', 'hours', 'minutes', 'seconds'].map((interval) => (
    <div key={interval} className="glass-box">
      <span>{timeLeft[interval]}</span>
      <p>{interval}</p>
    </div>
  ));

  return (
    <div className="glass-container">
      {timerComponents}
    </div>
  );
};

export default GlassCountdown;
