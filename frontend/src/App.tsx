// src/App.tsx
import { Routes, Route } from "react-router-dom";

// Секции главной страницы
import { Cover } from "@/sections/Cover";
import { CountdownSection } from "@/sections/CountdownSection";
import { InfoSection } from "@/sections/InfoSection";
import { RsvpForm } from "@/sections/RsvpForm";

// Страницы
import EditPage from "@/pages/EditPage";
import NotFound from "@/pages/NotFound";
import AdminResponsesPage from "@/features/admin/pages/AdminResponsesPage";
import ProtectedRoute from "@/features/admin/pages/ProtectedRoute"; // <-- обновлённый путь

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Cover />
              <CountdownSection />
              <InfoSection />
              <RsvpForm />
            <footer className="py-12 bg-gray-900 text-gray-300 text-center">
                <p>С любовью и теплом ❤️</p>
                <p className="mt-2 text-sm">2026 © Юбилей Виталия</p>
                <div>
                  <h4>
                    Запрограмлено{" "}
                    <a
                      target="_blank"
                      className="text-decoration-none"
                      href="https://t.me/PotatoChipasu"
                    >
                      @PotatoChipasu
                    </a>
                  </h4>
                  <h5>
                    <a target="_blank" href="https://t.me/No_Logs_app_bot">
                      Доступ к интернету без ограничений с настроенным VPS
                      сервером
                    </a>
                  </h5>
                </div>
              </footer>
            </>
          }
        />
        <Route path="/edit/:code" element={<EditPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminResponsesPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}