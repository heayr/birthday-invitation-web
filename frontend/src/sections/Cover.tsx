// src/sections/Cover.tsx
import { cn } from "@/lib/cn";

export function Cover() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden">
      {/* Фоновая текстура / градиент */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(14,165,233,0.15),transparent_50%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 mb-6 animate-fade-in">
          Приглашение на юбилей
        </h1>

        <p className="text-3xl sm:text-4xl md:text-5xl font-medium text-primary-700 mb-8">
          Виталий
        </p>

        <div className="text-xl sm:text-2xl md:text-3xl text-gray-700 space-y-3">
          <p>29 мая 2026 года</p>
          <p className="text-primary-600 font-semibold">17:00</p>
        </div>

        <p className="mt-10 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Балаково • Фуршет • Место будет объявлено ближе к дате
        </p>

        <a
          href="#rsvp"
          className="mt-12 inline-block px-10 py-5 bg-primary-600 text-white text-xl font-medium rounded-xl shadow-lg hover:bg-primary-700 transition-all duration-300 hover:scale-105"
        >
          Подтвердить участие ↓
        </a>
      </div>
    </section>
  );
}
