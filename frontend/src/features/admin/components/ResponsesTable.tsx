import { AdminRsvp } from '../../../lib/api';

interface ResponsesTableProps {
  responses: AdminRsvp[];
  loading: boolean;
}

export const ResponsesTable = ({ responses, loading }: ResponsesTableProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-10 text-center">
        <div className="text-gray-500">Загрузка ответов...</div>
      </div>
    );
  }

  if (responses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-10 text-center">
        <div className="text-gray-500">Ничего не найдено</div>
      </div>
    );
  }

  return (
    <>
      {/* 📱 MOBILE (карточки) */}
      <div className="lg:hidden space-y-4">
        {responses.map((rsvp) => (
          <div
            key={rsvp.id}
            className="bg-white rounded-2xl border p-5 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-semibold text-gray-900">
                  {rsvp.name}
                </div>
                <div className="text-sm text-gray-500">
                  {rsvp.email || '—'}
                </div>
              </div>

              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  rsvp.attending
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {rsvp.attending ? 'Будет' : 'Не будет'}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <div>+1: {rsvp.plusOne > 0 ? rsvp.plusOne : '—'}</div>
              <div>Алкоголь: {rsvp.alcohol || '—'}</div>
              <div className="truncate">Комментарий: {rsvp.comment || '—'}</div>
            </div>

            <div className="text-xs text-gray-400 mt-3">
              {new Date(rsvp.createdAt).toLocaleString('ru-RU')}
            </div>
          </div>
        ))}
      </div>

      {/* 💻 DESKTOP (таблица) */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-4 text-left">Имя</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-center">Статус</th>
                <th className="px-6 py-4 text-center">+1</th>
                <th className="px-6 py-4 text-left">Алкоголь</th>
                <th className="px-6 py-4 text-left">Комментарий</th>
                <th className="px-6 py-4 text-right">Дата</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {responses.map((rsvp) => (
                <tr key={rsvp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{rsvp.name}</td>

                  <td className="px-6 py-4 text-gray-600">
                    {rsvp.email || '—'}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        rsvp.attending
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {rsvp.attending ? 'Будет' : 'Не будет'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    {rsvp.plusOne > 0 ? `+${rsvp.plusOne}` : '—'}
                  </td>

                  <td className="px-6 py-4">
                    {rsvp.alcohol || '—'}
                  </td>

                  <td className="px-6 py-4 max-w-xs truncate">
                    {rsvp.comment || '—'}
                  </td>

                  <td className="px-6 py-4 text-right text-xs text-gray-500">
                    {new Date(rsvp.createdAt).toLocaleString('ru-RU')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};