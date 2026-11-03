import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/eventlist";

function HomePage() {
  const { events } = useEvents();

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <>
      <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
      <EventList events={upcoming} />
      <div className="all-events-btn-wrapper">
        <Link className="btn-primary buton" to="/events">
          Tüm etkinlikleri gör
        </Link>
      </div>
    </>
  );
}

export default HomePage;