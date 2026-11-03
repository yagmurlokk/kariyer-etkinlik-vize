import { useState, type ChangeEvent, type FormEvent } from "react";
import type { EventFormData } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;

interface EventFormProps {
  initialData?: EventFormData;
  submitText?: string;
  categories: string[];
  onSubmit: (data: EventFormData) => void;
}

const defaultData: EventFormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
};

function EventForm({
  initialData,
  submitText = "Kaydet",
  categories,
  onSubmit,
}: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData ?? defaultData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    if (errors[name as keyof EventFormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);

    if (Object.keys(found).length === 0) {
      onSubmit(data);
    }
  }

  return (
    <form
      className="form"
      noValidate
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "600px",
        marginTop: "20px",
      }}
    >
      {/* Etkinlik Adı */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label htmlFor="title" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
          Etkinlik Adı
        </label>
        <input
          type="text"
          id="title"
          name="title"
          maxLength={80}
          value={data.title}
          aria-invalid={errors.title ? true : undefined}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        />
        {errors.title && <span className="hata-metni">{errors.title}</span>}
      </div>

      {/* Kategori */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label htmlFor="category" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
          Kategori
        </label>
        <select
          id="category"
          name="category"
          value={data.category}
          aria-invalid={errors.category ? true : undefined}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        >
          <option value="">Seçiniz...</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <span className="hata-metni">{errors.category}</span>}
      </div>

      {/* Tarih & Saat */}
      <div style={{ display: "flex", gap: "15px" }}>
        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
          <label htmlFor="date" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Tarih
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={data.date}
            aria-invalid={errors.date ? true : undefined}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.date && <span className="hata-metni">{errors.date}</span>}
        </div>

        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
          <label htmlFor="time" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Saat
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={data.time}
            aria-invalid={errors.time ? true : undefined}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.time && <span className="hata-metni">{errors.time}</span>}
        </div>
      </div>

      {/* Konum */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label htmlFor="location" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
          Konum
        </label>
        <input
          type="text"
          id="location"
          name="location"
          maxLength={100}
          value={data.location}
          aria-invalid={errors.location ? true : undefined}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        />
        {errors.location && <span className="hata-metni">{errors.location}</span>}
      </div>

      {/* Kontenjan */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label htmlFor="capacity" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
          Kontenjan
        </label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          min={1}
          value={data.capacity}
          aria-invalid={errors.capacity ? true : undefined}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        />
        {errors.capacity && <span className="hata-metni">{errors.capacity}</span>}
      </div>

      {/* Açıklama */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label htmlFor="description" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
          Açıklama
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          maxLength={500}
          value={data.description}
          aria-invalid={errors.description ? true : undefined}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        />
        {errors.description && <span className="hata-metni">{errors.description}</span>}
      </div>

      <button type="submit" className="btn-primary" style={{ padding: "10px", marginTop: "10px" }}>
        {submitText}
      </button>
    </form>
  );
}

export default EventForm;