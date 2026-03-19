import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";

const TARGET_DATE = new Date("2026-05-29T17:00:00+04:00"); // Балаково — UTC+4

interface CountdownProps {
  className?: string;
}

export function Countdown({ className }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = +TARGET_DATE - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const { days, hours, minutes, seconds } = timeLeft;

  if (days + hours + minutes + seconds <= 0) {
    return (
      <div
        className={cn(
          "text-center text-xl font-medium text-accent-500",
          className,
        )}
      >
        Событие уже началось!
      </div>
    );
  }

  return (
    <div
      className={cn("flex flex-wrap justify-center gap-4 md:gap-6", className)}
    >
      <TimeUnit value={days} label="дней" />
      <TimeUnit value={hours} label="часов" />
      <TimeUnit value={minutes} label="минут" />
      <TimeUnit value={seconds} label="секунд" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-600 tabular-nums">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-sm md:text-base text-gray-600 mt-1">{label}</div>
    </div>
  );
}
