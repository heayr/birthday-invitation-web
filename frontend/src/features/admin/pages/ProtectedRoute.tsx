// src/components/ProtectedRoute.tsx
import { useState } from "react";
import { Base64 } from "js-base64";

interface ProtectedRouteProps {
  children: React.ReactNode; // <- меняем JSX.Element на React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // Проверяем пароль через бэкенд
      const headers = {
        Authorization: `Basic ${Base64.encode(`admin:${password}`)}`,
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/rsvp/admin/all?page=1&limit=1`,
        { headers }
      );

      if (!res.ok) throw new Error("Неверный пароль");

      setAuthenticated(true);
    } catch (err: any) {
      setError(err.message || "Ошибка авторизации");
    } finally {
      setLoading(false);
    }
  };

  if (authenticated) return children;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Введите пароль для доступа
        </h2>
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          disabled={loading}
        >
          {loading ? "Проверка..." : "Войти"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}