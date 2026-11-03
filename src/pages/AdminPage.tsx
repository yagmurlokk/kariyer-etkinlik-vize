import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";

export default function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string) {
    if (window.confirm(`"${title}" silinsin mi?`)) {
      deleteEvent(id);
    }
  }

  return (
    <section>
      <h2 className="bolum-baslik">Etkinlik Yönetimi</h2>

      <div style={{ marginBottom: "20px" }}>
        <Link to="/admin/new" className="btn-primary buton">
          + Yeni etkinlik
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="sonuc">Henüz etkinlik yok.</p>
      ) : (
        <table className="tablo">
          <thead>
            <tr>
              <th>Etkinlik</th>
              <th>Tarih</th>
              <th>Kategori</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{formatDate(event.date)}</td>
                <td>{event.category}</td>
                <td>
                  <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                    <Link
                      to={`/admin/${event.id}/edit`}
                      className="btn-primary buton"
                      style={{ padding: "6px 12px", textDecoration: "none" }}
                    >
                      Düzenle
                    </Link>
                    <button
                      type="button"
                      className="buton buton-sil"
                      onClick={() => handleDelete(event.id, event.title)}
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}