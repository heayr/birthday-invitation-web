// src/components/Countdown.tsx
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import "./../styles/components/Countdown.css";

interface CountdownProps {
  targetDate?: Date;
  className?: string;
}

const formatNumber = (num: number) => num.toString().padStart(2, "0");

export function Countdown({
  targetDate = new Date("2026-05-30T17:00:00"),
  className,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={cn("countdown", className)}>
      <div className="countdown-grid">
        <div className="countdown-block">
          <div className="countdown-value">{formatNumber(timeLeft.days)}</div>
          <div className="countdown-label">дней</div>
        </div>
        <div className="countdown-block">
          <div className="countdown-value">{formatNumber(timeLeft.hours)}</div>
          <div className="countdown-label">часов</div>
        </div>
        <div className="countdown-block">
          <div className="countdown-value">
            {formatNumber(timeLeft.minutes)}
          </div>
          <div className="countdown-label">минут</div>
        </div>
        <div className="countdown-block">
          <div className="countdown-value">
            {formatNumber(timeLeft.seconds)}
          </div>
          <div className="countdown-label">секунд</div>
        </div>
      </div>
    </div>
  );
}
