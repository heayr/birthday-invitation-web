// frontend/src/features/admin/components/ResponsesTable.tsx
import { AdminRsvp } from '../../../lib/api';

interface ResponsesTableProps {
  responses: AdminRsvp[];
  loading: boolean;
}

export const ResponsesTable = ({ responses, loading }: ResponsesTableProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="text-gray-500">Загрузка ответов...</div>
      </div>
    );
  }

  if (responses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="text-gray-500">По вашему запросу ничего не найдено</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-5 text-left font-semibold text-gray-700">Имя</th>
              <th className="px-6 py-5 text-left font-semibold text-gray-700">Email</th>
              <th className="px-6 py-5 text-center font-semibold text-gray-700">Статус</th>
              <th className="px-6 py-5 text-center font-semibold text-gray-700">+1</th>
              <th className="px-6 py-5 text-left font-semibold text-gray-700">Алкоголь</th>
              <th className="px-6 py-5 text-left font-semibold text-gray-700">Комментарий</th>
              <th className="px-6 py-5 text-right font-semibold text-gray-700">Дата</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {responses.map((rsvp) => (
              <tr key={rsvp.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5 font-medium text-gray-900">{rsvp.name}</td>
                <td className="px-6 py-5 text-gray-600">
                  {rsvp.email || <span className="text-gray-400">—</span>}
                </td>
                <td className="px-6 py-5 text-center">
                  {rsvp.attending ? (
                    <span className="inline-flex px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Будет
                    </span>
                  ) : (
                    <span className="inline-flex px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                      Не будет
                    </span>
                  )}
                </td>
                <td className="px-6 py-5 text-center font-medium text-gray-700">
                  {rsvp.plusOne > 0 ? `+${rsvp.plusOne}` : '—'}
                </td>
                <td className="px-6 py-5 text-gray-600">
                  {rsvp.alcohol || <span className="text-gray-400">—</span>}
                </td>
                <td className="px-6 py-5 text-gray-600 max-w-xs truncate">
                  {rsvp.comment || <span className="text-gray-400">—</span>}
                </td>
                <td className="px-6 py-5 text-right text-xs text-gray-500">
                  {new Date(rsvp.createdAt).toLocaleDateString('ru-RU', { 
                    day: 'numeric', 
                    month: 'short', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};