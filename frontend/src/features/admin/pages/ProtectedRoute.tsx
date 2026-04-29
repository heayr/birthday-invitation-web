// src/components/ProtectedRoute.tsx
import { useState, useEffect, useCallback } from "react";
import { Base64 } from "js-base64";
import '../admin.css';

const AUTH_TOKEN_KEY = 'adminAuthToken';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true); // start true for auto-login check
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

  // Проверка токена через API
  const verifyToken = useCallback(async (token: string): Promise<boolean> => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/rsvp/admin/all?page=1&limit=1`,
        { headers: { Authorization: `Basic ${token}` } }
      );
      return res.ok;
    } catch {
      return false;
    }
  }, []);

  // Автоматический вход при наличии сохранённого токена
  useEffect(() => {
    const savedToken = sessionStorage.getItem(AUTH_TOKEN_KEY);
    if (savedToken) {
      verifyToken(savedToken).then((valid) => {
        if (valid) {
          setAuthenticated(true);
        } else {
          // Токен протух или невалиден — удаляем
          sessionStorage.removeItem(AUTH_TOKEN_KEY);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [verifyToken]);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = Base64.encode(`admin:${password}`);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/rsvp/admin/all?page=1&limit=1`,
        { headers: { Authorization: `Basic ${token}` } }
      );

      if (!res.ok) throw new Error("Неверный пароль");

      // Сохраняем закодированный токен в sessionStorage (очищается при закрытии вкладки)
      sessionStorage.setItem(AUTH_TOKEN_KEY, token);
      setAuthenticated(true);
    } catch (err: any) {
      setError(err.message || "Ошибка авторизации");
    } finally {
      setLoading(false);
    }
  };

  // Показываем загрузку пока идёт проверка токена
  if (loading && !error) {
    return (
      <div className="login-page">
        <div className="login-card">
          <p className="login-subtitle">Проверка авторизации...</p>
        </div>
      </div>
    );
  }

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
          onKeyDown={(e) => e.key === "Enter" && password && handleLogin()}
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
          Сессия активна до закрытия вкладки
        </p>
      </div>
    </div>
  );
}