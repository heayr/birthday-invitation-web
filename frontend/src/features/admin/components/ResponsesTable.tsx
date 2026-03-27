// frontend/src/features/admin/components/ResponsesTable.tsx
import { AdminRsvp } from '../../../lib/api';
import '../admin.css';


interface ResponsesTableProps {
  responses: AdminRsvp[];
  loading: boolean;
}

export const ResponsesTable = ({ responses, loading }: ResponsesTableProps) => {
  if (loading) {
    return <div className="admin-table-loading">Загрузка ответов...</div>;
  }

  if (responses.length === 0) {
    return <div className="admin-table-empty">По вашему запросу ничего не найдено</div>;
  }

  return (
    <div className="admin-table-mobile">
      {responses.map((rsvp) => (
        <div key={rsvp.id} className="admin-card">
          <div className="admin-card-header">
            <div>
              <div className="admin-card-name">{rsvp.name}</div>
              {rsvp.email && <div className="admin-card-email">{rsvp.email}</div>}
            </div>
            <span className={`admin-status ${rsvp.attending ? 'admin-status-will' : 'admin-status-wont'}`}>
              {rsvp.attending ? 'Будет' : 'Не будет'}
            </span>
          </div>

          <div className="admin-card-info">
            <div><strong>+1:</strong> {rsvp.plusOne > 0 ? rsvp.plusOne : '—'}</div>
            {rsvp.alcohol && <div><strong>Алкоголь:</strong> {rsvp.alcohol}</div>}
            {rsvp.comment && <div><strong>Комментарий:</strong> {rsvp.comment}</div>}
          </div>

          <div className="admin-card-date">
            {new Date(rsvp.createdAt).toLocaleString('ru-RU')}
          </div>
        </div>
      ))}
    </div>
  );
};