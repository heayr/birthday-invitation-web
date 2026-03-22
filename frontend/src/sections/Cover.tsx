// src/sections/Cover.tsx
import { cn } from "@/lib/cn";
import "./../styles/components/Cover.css";

export function Cover() {
  return (
    <section className="cover-section">
      {/* Фоновая текстура */}
      <div className="cover-texture">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,#388e3c15,transparent_70%)]" />
      </div>

      <div className="cover-content">
        <h1 className="cover-title">Приглашение на юбилей</h1>

        <p className="cover-subtitle">45 лет</p>

        <div className="cover-date">
          <p>30 мая 2026 • 17:00</p>
          <p className="mt-2 text-lg md:text-xl">
            Кафе «Золотой Ключик» · просп. Героев, 36/2, Балаково, ТЦ Айсберг
          </p>
        </div>

        <div className="mt-12 md:mt-16">
          <a href="#rsvp" className="cover-button">
            Подтвердить участие
          </a>
        </div>
      </div>
    </section>
  );
}
