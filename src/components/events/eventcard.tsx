import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
}

function EventCard({ event }: EventCardProps) {
  return (
    <article className="card">
      <div>
        <h3 style={{ marginBottom: "5px" }}>{event.title}</h3>
        <span className="kategori-etiketi">{event.category}</span>
        
        <p>Tarih: {formatDate(event.date)}, {event.time}</p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        
        <Link 
          to={`/events/${event.id}`} 
          className="btn-detail"
        >
          Detayları gör
        </Link>
      </div>
    </article>
  );
}

export default EventCard;