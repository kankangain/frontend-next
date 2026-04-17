"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: string;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetTime = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      <div className="text-center rounded-lg bg-primary/10 p-3 sm:p-4">
        <div className="font-display text-2xl sm:text-3xl font-bold text-primary">
          {String(timeLeft.days).padStart(2, "0")}
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground">Days</div>
      </div>
      <div className="text-center rounded-lg bg-accent/10 p-3 sm:p-4">
        <div className="font-display text-2xl sm:text-3xl font-bold text-accent">
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground">Hours</div>
      </div>
      <div className="text-center rounded-lg bg-primary/10 p-3 sm:p-4">
        <div className="font-display text-2xl sm:text-3xl font-bold text-primary">
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground">Minutes</div>
      </div>
      <div className="text-center rounded-lg bg-accent/10 p-3 sm:p-4">
        <div className="font-display text-2xl sm:text-3xl font-bold text-accent">
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground">Seconds</div>
      </div>
    </div>
  );
}
