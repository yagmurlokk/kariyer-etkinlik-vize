import { useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventDetail from "../components/events/eventdetail";
import NotFoundPage from "./NotFoundPage";
import { findEventById } from "../utils/filter-events";

function EventDetailPage() {
  const { id } = useParams();
  const { events } = useEvents();
  const event = findEventById(events, id ?? "");

  if (!event) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h2 className="bolum-baslik">{event.title}</h2>
      <EventDetail event={event} />
    </>
  );
}

export default EventDetailPage;