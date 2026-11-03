import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/eventlist";
import EventFilter from "../components/events/eventfilter";
import type { Category } from "../types/campus-event";
import { searchEvents, filterByCategory } from "../utils/filter-events";

export default function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(
    searchEvents(events, searchText),
    category
  );

  return (
    <>
      <h2 className="bolum-baslik">Tüm Etkinlikler</h2>
      <EventFilter
        searchText={searchText}
        selectedCategory={category}
        categories={categories}
        onSearchChange={setSearchText}
        onCategoryChange={setCategory}
      />
      <EventList
        events={filtered}
        emptyText="Aradığınız kriterlere uygun etkinlik bulunamadı."
      />
    </>
  );
}