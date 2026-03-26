// frontend/src/features/admin/pages/AdminResponsesPage.tsx
import { useState, ChangeEvent } from 'react';
import { useAdminResponses } from '../hooks/useAdminResponses';
import { ResponsesTable } from '../components/ResponsesTable';

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
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Админ-панель
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Ответы гостей • Всего найдено: <span className="font-semibold text-gray-900">{pagination?.total || 0}</span>
          </p>
        </div>

        {/* Фильтры */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Поиск */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Поиск по имени или email..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base"
                />
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors whitespace-nowrap"
            >
              Найти
            </button>

            {/* Фильтр по статусу */}
            <div className="flex gap-2">
              <button
                onClick={() => handleAttendingFilter(undefined)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  filters.attending === undefined
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Все
              </button>

              <button
                onClick={() => handleAttendingFilter(true)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  filters.attending === true
                    ? 'bg-green-600 text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-50 text-green-700'
                }`}
              >
                Будет
              </button>

              <button
                onClick={() => handleAttendingFilter(false)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  filters.attending === false
                    ? 'bg-red-600 text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-50 text-red-700'
                }`}
              >
                Не будет
              </button>
            </div>
          </div>
        </div>

        {/* Таблица */}
        <div className="mb-10">
          <ResponsesTable responses={responses} loading={loading} />
        </div>

        {/* Пагинация */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => changePage(filters.page - 1)}
              disabled={filters.page === 1}
              className="px-6 py-3 bg-white border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-medium"
            >
              ← Назад
            </button>

            <div className="px-8 py-3 bg-white border border-gray-200 rounded-xl text-sm">
              Страница <span className="font-semibold">{filters.page}</span> из {pagination.totalPages}
            </div>

            <button
              onClick={() => changePage(filters.page + 1)}
              disabled={filters.page === pagination.totalPages}
              className="px-6 py-3 bg-white border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-medium"
            >
              Вперед →
            </button>
          </div>
        )}

        {error && (
          <div className="mt-8 p-5 bg-red-50 border border-red-200 text-red-700 rounded-2xl">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}