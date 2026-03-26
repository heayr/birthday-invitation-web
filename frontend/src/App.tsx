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