import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay">
      <h2 style={{ marginBottom: "20px" }}>{event.title}</h2>
      
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {event.image && (
          <figure style={{ flex: "1", minWidth: "300px", margin: "0" }}>
            <img src={event.image} alt={event.title} style={{ width: "100%", borderRadius: "8px" }} />
          </figure>
        )}

        <div className="kunye" style={{ flex: "2", minWidth: "300px" }}>
          <p><strong>Kategori:</strong> {event.category}</p>
          <p><strong>Tarih:</strong> {formatDate(event.date)} - <strong>Saat:</strong> {event.time}</p>
          <p><strong>Konum:</strong> {event.location}</p>
          <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
          <p style={{ marginTop: "15px", marginBottom: "20px" }}><strong>Açıklama:</strong> {event.description}</p>
          
          <button 
            className="btn-primary" 
            onClick={() => onEdit(event.id)}
            style={{ marginRight: "10px" }}
          >
            Bu etkinliği güncelle
          </button>
          <button className="btn-secondary" onClick={onBack}>
            Listeye Dön
          </button>
        </div>
      </div>
    </article>
  );
}

export default EventDetail;