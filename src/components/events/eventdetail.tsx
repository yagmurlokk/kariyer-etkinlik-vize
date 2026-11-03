import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

function EventDetail({ event }: EventDetailProps) {
  return (
    <article
      className="detay detail-card"
      style={{
        maxWidth: "700px",
        margin: "20px auto",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>{event.title}</h2>
      
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {event.image && (
          <figure style={{ maxWidth: "400px", width: "100%", margin: "0 auto" }}>
            <img
              src={event.image}
              alt={event.title}
              style={{ width: "100%", borderRadius: "8px", display: "block", margin: "0 auto" }}
            />
          </figure>
        )}

        <div className="kunye" style={{ width: "100%", textAlign: "center" }}>
          <p style={{ marginBottom: "8px" }}><strong>Kategori:</strong> {event.category}</p>
          <p style={{ marginBottom: "8px" }}><strong>Tarih:</strong> {formatDate(event.date)} - <strong>Saat:</strong> {event.time}</p>
          <p style={{ marginBottom: "8px" }}><strong>Konum:</strong> {event.location}</p>
          <p style={{ marginBottom: "8px" }}><strong>Kontenjan:</strong> {event.capacity} kişi</p>
          <p style={{ marginTop: "15px", marginBottom: "20px" }}><strong>Açıklama:</strong> {event.description}</p>
          
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
            <Link 
              to={`/admin/${event.id}/edit`} 
              className="btn-primary"
            >
              Bu etkinliği güncelle
            </Link>
            <Link 
              to="/events" 
              className="btn-primary btn-secondary"
            >
              Listeye Dön
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default EventDetail;