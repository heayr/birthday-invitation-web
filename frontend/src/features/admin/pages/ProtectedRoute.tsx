// src/components/ProtectedRoute.tsx
import { useState, useEffect } from "react";
import { Base64 } from "js-base64";
import '../admin.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Поддержка тёмной темы
  useEffect(() => {
    const savedTheme = localStorage.getItem("adminTheme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
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

  // Если пользователь авторизован — показываем детей (админ-панель)
  if (authenticated) {
    return <>{children}</>;
  }

  // Форма входа
  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Доступ к админ-панели</h2>
        <p className="login-subtitle">Введите пароль администратора</p>

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          autoFocus
        />

        <button
          onClick={handleLogin}
          disabled={loading || !password}
          className="login-button"
        >
          {loading ? "Проверка..." : "Войти"}
        </button>

        {error && <p className="login-error">{error}</p>}

        <p className="login-hint">
          Пароль хранится только в памяти браузера
        </p>
      </div>
    </div>
  );
}