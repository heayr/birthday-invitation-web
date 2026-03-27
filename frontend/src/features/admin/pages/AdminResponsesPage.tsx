// frontend/src/features/admin/pages/AdminResponsesPage.tsx
import { useState, ChangeEvent, useEffect } from 'react';
import { useAdminResponses } from '../hooks/useAdminResponses';
import { ResponsesTable } from '../components/ResponsesTable';
import '../admin.css';


export default function AdminResponsesPage() {
  const {
    responses,
    pagination,
    loading,
    error,
    filters,
    updateFilters,
    changePage,
  } = useAdminResponses();

  const [searchValue, setSearchValue] = useState(filters.search);

  // Управление темой (оставляем как было)
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('adminTheme');
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(systemDark ? 'dark' : 'light');
      if (systemDark) document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('adminTheme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSearch = () => {
    updateFilters({ search: searchValue });
  };

  const handleAttendingFilter = (value: boolean | undefined) => {
    updateFilters({ attending: value });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <h1>Админ-панель</h1>
          <p>
            Ответы гостей • Всего найдено:{" "}
            <span className="font-semibold">{pagination?.total || 0}</span>
          </p>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Фильтры */}
        <div className="admin-filters">
          <input
            type="text"
            placeholder="Поиск по имени или email..."
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="admin-search-input"
          />

          <button onClick={handleSearch} className="admin-btn admin-btn-primary">
            Найти
          </button>

          <div className="admin-filter-group">
            <button
              onClick={() => handleAttendingFilter(undefined)}
              className={`admin-filter-btn ${filters.attending === undefined ? 'active' : ''}`}
            >
              Все
            </button>
            <button
              onClick={() => handleAttendingFilter(true)}
              className={`admin-filter-btn ${filters.attending === true ? 'active' : ''}`}
            >
              Будет
            </button>
            <button
              onClick={() => handleAttendingFilter(false)}
              className={`admin-filter-btn ${filters.attending === false ? 'active' : ''}`}
            >
              Не будет
            </button>
          </div>
        </div>

        {/* Таблица */}
        <div className="mb-10">
          <ResponsesTable responses={responses} loading={loading} />
        </div>

        {/* Пагинация */}
        {pagination && pagination.totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => changePage(filters.page - 1)}
              disabled={filters.page === 1}
            >
              ← Назад
            </button>

            <div className="pagination-info">
              Страница <strong>{filters.page}</strong> из {pagination.totalPages}
            </div>

            <button
              onClick={() => changePage(filters.page + 1)}
              disabled={filters.page === pagination.totalPages}
            >
              Вперед →
            </button>
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}