// src/sections/CountdownSection.tsx
import { Countdown } from "../components/CountDown";
// import { Countdown } from "@/components/Countdown";
import { cn } from "@/lib/cn";
import "./../styles/components/CountdownSection.css";

interface CountdownSectionProps {
  className?: string;
}

export function CountdownSection({ className }: CountdownSectionProps) {
  return (
    <section className={cn("countdown-section", className)}>
      <div className="countdown-container">
        <div className="countdown-wrapper">
          <h2 className="countdown-title">До юбилея осталось</h2>
          <Countdown />
        </div>
      </div>
    </section>
  );
}
