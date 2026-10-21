import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./eventcard"; // Adım 5'te oluşturduğun kart bileşeni

interface EventListProps {
  events: CampusEvent[];
  onShowDetail: (id: string) => void;
  emptyText?: string;
}

function EventList({ events, onShowDetail, emptyText }: EventListProps) {
  // 3. Dizi boşsa sadece mesaj döndür
  if (events.length === 0) {
    return <p className="sonuc">{emptyText}</p>;
  }

  // 4. Değilse map ile EventCard'ları çiz
  return (
    <section className="events-grid">
      {events.map((event) => (
        <EventCard 
          key={event.id} 
          event={event} 
          onShowDetail={onShowDetail} 
        />
      ))}
    </section>
  );
}

export default EventList;