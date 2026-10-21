import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import type { PageName } from "./types/page";
import { formatDate } from "./utils/format-date";
import Navigation from "./components/layout/navigation";
import EventList from "./components/events/eventlist";
import EventFilter from "./components/events/eventfilter";
import EventDetail from "./components/events/eventdetail";
import EventForm from "./components/forms/eventform";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }
  let currentTitle = "";
  if (page === "home") currentTitle = "Ana Sayfa";
  else if (page === "events") currentTitle = "Etkinlikler";
  else if (page === "add") currentTitle = "Ekle";
  else if (page === "update") currentTitle = "Güncelle";
  else if (page === "detail" && selectedId) {
    const selectedEvent = findEventById(events, selectedId);
    currentTitle = selectedEvent ? selectedEvent.title : "Detay";
  }
  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${currentTitle}`;
  }, [currentTitle]);
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);
  const categories = [...new Set(events.map(e => e.category))];
  const filteredEvents = filterByCategory(
    searchEvents(events, searchText), 
    selectedCategory
  );
  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  return (
    <>
      <header className="navbar">
        <div className="header-inner">      
          <Header 
            title={currentTitle} 
            text="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." 
          />
          {/* Menü döngüsü tamamen Navigation bileşenine devredildi */}
          <Navigation current={page} onNavigate={go} />         
        </div>
      </header>
      <main className="container">
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList 
              events={upcoming} 
              onShowDetail={(id) => go("detail", id)} 
            />
            <div className="all-events-btn-wrapper">
              <button className="btn-primary" onClick={(e) => { e.preventDefault(); go("events"); }}>
                Tüm etkinlikleri gör
              </button>
            </div>
          </>
        )}        
        {page === "events" && (
          <>
            <h2>Tüm Etkinlikler</h2>
            <EventFilter 
              searchText={searchText}
              selectedCategory={selectedCategory}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setSelectedCategory}
            />
            <EventList 
              events={filteredEvents} 
              onShowDetail={(id) => go("detail", id)} 
              emptyText="Aradığınız kriterlere uygun etkinlik bulunamadı."
            />
          </>
        )}
        {(page === "add" || page === "update") && (
          <div className="form-container">
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>           
            <EventForm 
              categories={categories}
              onSubmit={() => window.scrollTo(0, 0)} 
            />
          </div>
        )}
        {page === "detail" && !selected && (
          <div className="hata-kutusu" style={{ textAlign: "center", padding: "40px" }}>
            <h2>Etkinlik Bulunamadı</h2>
            <p>Aradığınız etkinlik silinmiş veya taşınmış olabilir.</p>
            <button className="btn-primary" onClick={() => go("events")}>Listeye Dön</button>
          </div>
        )}
        {page === "detail" && selected && (
          <EventDetail 
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)} 
          />
        )}
      </main>
      <Footer/>      
    </>
  );
}
export default App;