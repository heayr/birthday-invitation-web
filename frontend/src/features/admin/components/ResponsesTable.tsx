// frontend/src/features/admin/components/ResponsesTable.tsx
import { AdminRsvp } from '../../../lib/api';
import '../admin.css';

interface ResponsesTableProps {
  responses: AdminRsvp[];
  loading: boolean;
}

export const ResponsesTable = ({ responses, loading }: ResponsesTableProps) => {
  if (loading) {
    return (
      <div className="admin-table-loading">
        Загрузка ответов...
      </div>
    );
  }

  if (responses.length === 0) {
    return (
      <div className="admin-table-empty">
        Ничего не найдено по вашему запросу
      </div>
    );
  }

  return (
    <>
      {/* Мобильная версия — карточки */}
      <div className="admin-table-mobile">
        {responses.map((rsvp) => (
          <div key={rsvp.id} className="admin-card">
            <div className="admin-card-header">
              <div>
                <div className="admin-card-name">{rsvp.name}</div>
                <div className="admin-card-email">{rsvp.email || '—'}</div>
              </div>
              <span className={`admin-status ${rsvp.attending ? 'admin-status-will' : 'admin-status-wont'}`}>
                {rsvp.attending ? 'Будет' : 'Не будет'}
              </span>
            </div>

            <div className="admin-card-info">
              <div><strong>+1:</strong> {rsvp.plusOne > 0 ? rsvp.plusOne : '—'}</div>
              <div><strong>Алкоголь:</strong> {rsvp.alcohol || '—'}</div>
              <div><strong>Комментарий:</strong> {rsvp.comment || '—'}</div>
            </div>

            <div className="admin-card-date">
              {new Date(rsvp.createdAt).toLocaleString('ru-RU')}
            </div>
          </div>
        ))}
      </div>

      {/* Десктопная версия — таблица */}
      <div className="admin-table-desktop">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Статус</th>
              <th>+1</th>
              <th>Алкоголь</th>
              <th>Комментарий</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((rsvp) => (
              <tr key={rsvp.id}>
                <td className="admin-table-name">{rsvp.name}</td>
                <td className="admin-table-email">{rsvp.email || '—'}</td>
                <td className="admin-table-status">
                  <span className={`admin-status ${rsvp.attending ? 'admin-status-will' : 'admin-status-wont'}`}>
                    {rsvp.attending ? 'Будет' : 'Не будет'}
                  </span>
                </td>
                <td className="admin-table-plusone">
                  {rsvp.plusOne > 0 ? `+${rsvp.plusOne}` : '—'}
                </td>
                <td>{rsvp.alcohol || '—'}</td>
                <td className="admin-table-comment">{rsvp.comment || '—'}</td>
                <td className="admin-table-date">
                  {new Date(rsvp.createdAt).toLocaleString('ru-RU')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};