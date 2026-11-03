import { useNavigate } from "react-router-dom";
import EventForm from "../components/forms/eventform";
import { useEvents } from "../context/EventsContext";
import type { EventFormData } from "../types/campus-event";

const emptyForm: EventFormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
};

const categories = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

export default function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <h2 className="bolum-baslik">Yeni Etkinlik Ekle</h2>
      <EventForm
        initialData={emptyForm}
        categories={categories}
        submitText="Kaydet"
        onSubmit={(data) => {
          addEvent(data);
          navigate("/admin");
        }}
      />
    </div>
  );
}
