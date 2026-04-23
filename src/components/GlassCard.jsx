import { useCallback, useEffect, useState } from "react";

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

  const timerComponents = ["days", "hours", "minutes", "seconds"].map(
    (interval) => (
      <div
        key={interval}
        className="min-w-14.5 rounded-2xl border border-white/30 bg-white/10 px-[0.45rem] py-[0.65rem] text-center text-white shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10px] sm:min-w-17.5 sm:p-4"
      >
        <span className="block text-[clamp(1rem,4.8vw,2rem)] leading-none font-bold">
          {timeLeft[interval]}
        </span>
        <p className="mt-1 text-[clamp(0.55rem,2.1vw,0.8rem)] uppercase tracking-[0.03em]">
          {interval}
        </p>
      </div>
    ),
  );

  return (
    <div className="flex w-full justify-center gap-2 p-2 sm:gap-4 sm:p-4">
      {timerComponents}
    </div>
  );
};

export default GlassCountdown;
