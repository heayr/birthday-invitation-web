// src/App.tsx
import { Routes, Route } from "react-router-dom";

// Секции главной страницы
import { Cover } from "@/sections/Cover";
import { CountdownSection } from "@/sections/CountdownSection";
import { InfoSection } from "@/sections/InfoSection";
import { RsvpForm } from "@/components/RsvpForm"; // ← твоя форма лежит здесь

// Страницы
import EditPage from "@/pages/EditPage";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        {/* Главная страница — корневой маршрут */}
        <Route
          path="/"
          element={
            <>
              <Cover />
              <CountdownSection />
              <InfoSection />
              <RsvpForm />

              {/* Футер — общий для всей главной страницы */}
              <footer className="py-12 bg-gray-900 text-gray-300 text-center">
                <p>С любовью и теплом ❤️</p>
                <p className="mt-2 text-sm">2026 © Юбилей Виталия</p>
              </footer>
            </>
          }
        />

        {/* Страница редактирования по коду */}
        <Route path="/edit/:code" element={<EditPage />} />

        {/* Все остальные маршруты → 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
