import { createContext, useContext, useState, type ReactNode } from "react";
import type { CampusEvent, EventFormData, Category } from "../types/campus-event";
import { events as initialEvents } from "../data/events";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

// Form verisini CampusEvent tipine dönüştüren yardımcı fonksiyon
function toEvent(id: string, data: EventFormData): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    capacity: Number(data.capacity),
    date: data.date,
    time: data.time,
    location: data.location.trim(),
    description: data.description.trim(),
    image: data.image,
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  // Ekle: Sonuna yeni eleman ekleyerek yeni bir dizi oluşturur
  function addEvent(data: EventFormData) {
    const newEvent = toEvent(`event-${Date.now()}`, data);
    setEvents([...events, newEvent]);
  }

  // Güncelle: İlgili id'ye sahip elemanı yenisiyle değiştirir
  function updateEvent(id: string, data: EventFormData) {
    setEvents(
      events.map((e) => (e.id === id ? toEvent(id, data) : e))
    );
  }

  // Sil: Belirtilen id haricindekileri filtreler
  function deleteEvent(id: string) {
    setEvents(events.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const value = useContext(EventsContext);
  if (value === null) {
    throw new Error("useEvents bir EventsProvider içinde kullanılmalıdır.");
  }
  return value;
}