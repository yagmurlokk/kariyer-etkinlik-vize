import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./eventcard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
}

function EventList({ events, emptyText }: EventListProps) {
  if (events.length === 0) {
    return <p className="sonuc">{emptyText}</p>;
  }

  return (
    <section className="events-grid">
      {events.map((event) => (
        <EventCard 
          key={event.id} 
          event={event} 
        />
      ))}
    </section>
  );
}

export default EventList;