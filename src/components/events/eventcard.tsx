import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    // key={event.id} buradan silindi (Adım 6'da kullanılacak)
    <article className="card">
      <div>
        <h3 style={{ marginBottom: "5px" }}>{event.title}</h3>
        <span className="kategori-etiketi">{event.category}</span>
        
        <p>Tarih: {formatDate(event.date)}, {event.time}</p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        
        <button 
          className="btn-detail" 
          onClick={() => onShowDetail(event.id)}
        >
          Detayları gör
        </button>
      </div>
    </article>
  );
}

export default EventCard;