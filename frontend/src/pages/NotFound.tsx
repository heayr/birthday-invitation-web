// src/pages/NotFound.tsx
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
      <AlertTriangle className="w-24 h-24 text-red-500 mb-8" />
      <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        Страница не найдена
      </h2>
      <p className="text-lg text-gray-600 mb-10 max-w-md">
        Кажется, ты ввёл неверный адрес или код приглашения. Вернись на главную
        и попробуй снова.
      </p>

      <Link
        to="/"
        className="px-8 py-4 bg-primary-600 text-white text-xl font-medium rounded-xl shadow-lg hover:bg-primary-700 transition-all hover:scale-105"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
