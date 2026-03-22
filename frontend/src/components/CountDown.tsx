// import { useState, useEffect } from "react";
// import { cn } from "@/lib/cn";

// const TARGET_DATE = new Date("2026-05-29T17:00:00+04:00"); // Балаково — UTC+4

// interface CountdownProps {
//   className?: string;
// }

// export function Countdown({ className }: CountdownProps) {
//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   function calculateTimeLeft() {
//     const difference = +TARGET_DATE - +new Date();
//     let timeLeft = {
//       days: 0,
//       hours: 0,
//       minutes: 0,
//       seconds: 0,
//     };

//     if (difference > 0) {
//       timeLeft = {
//         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60),
//       };
//     }

//     return timeLeft;
//   }

//   const { days, hours, minutes, seconds } = timeLeft;

//   if (days + hours + minutes + seconds <= 0) {
//     return (
//       <div
//         className={cn(
//           "text-center text-xl font-medium text-accent-500",
//           className,
//         )}
//       >
//         Событие уже началось!
//       </div>
//     );
//   }

//   return (
//     <div
//       className={cn("flex flex-wrap justify-center gap-4 md:gap-6", className)}
//     >
//       <TimeUnit value={days} label="дней" />
//       <TimeUnit value={hours} label="часов" />
//       <TimeUnit value={minutes} label="минут" />
//       <TimeUnit value={seconds} label="секунд" />
//     </div>
//   );
// }

// function TimeUnit({ value, label }: { value: number; label: string }) {
//   return (
//     <div className="flex flex-col items-center">
//       <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-600 tabular-nums">
//         {value.toString().padStart(2, "0")}
//       </div>
//       <div className="text-sm md:text-base text-gray-600 mt-1">{label}</div>
//     </div>
//   );
// }

// // components/Countdown.tsx
// import { useEffect, useState } from "react";
// import { cn } from "@/lib/cn";

// interface CountdownProps {
//   targetDate?: Date;
//   className?: string;
// }

// const formatNumber = (num: number) => num.toString().padStart(2, "0");

// export function Countdown({
//   targetDate = new Date("2026-05-30T17:00:00"),
//   className,
// }: CountdownProps) {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = targetDate.getTime() - now;

//       if (distance < 0) {
//         clearInterval(timer);
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//         return;
//       }

//       setTimeLeft({
//         days: Math.floor(distance / (1000 * 60 * 60 * 24)),
//         hours: Math.floor(
//           (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
//         ),
//         minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
//         seconds: Math.floor((distance % (1000 * 60)) / 1000),
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [targetDate]);

//   return (
//     <div
//       className={cn("grid grid-cols-4 gap-8 md:gap-12 text-center", className)}
//     >
//       <TimeUnit value={formatNumber(timeLeft.days)} label="дней" />
//       <TimeUnit value={formatNumber(timeLeft.hours)} label="часов" />
//       <TimeUnit value={formatNumber(timeLeft.minutes)} label="минут" />
//       <TimeUnit value={formatNumber(timeLeft.seconds)} label="секунд" />
//     </div>
//   );
// }

// function TimeUnit({ value, label }: { value: string; label: string }) {
//   return (
//     <div className="flex flex-col">
//       <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-[var(--color-text-heading)] tabular-nums">
//         {value}
//       </span>
//       <span className="text-sm sm:text-base text-[var(--color-text-muted)] mt-2 uppercase tracking-wide">
//         {label}
//       </span>
//     </div>
//   );
// }

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
