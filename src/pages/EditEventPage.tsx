import { useParams, useNavigate } from "react-router-dom";
import EventForm from "../components/forms/eventform";
import NotFoundPage from "./NotFoundPage";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";

const categories = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();

  const event = findEventById(events, id ?? "");

  if (!event) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h2 className="bolum-baslik">Etkinlik Güncelle</h2>
      <EventForm
        initialData={{
          ...event,
          capacity: String(event.capacity),
        }}
        categories={categories}
        submitText="Güncelle"
        onSubmit={(data) => {
          updateEvent(event.id, data);
          navigate("/admin");
        }}
      />
    </>
  );
}

export default EditEventPage;