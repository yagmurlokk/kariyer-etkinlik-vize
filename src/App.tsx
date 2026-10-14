import { useState, useEffect } from "react";
import "./App.css";

import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";

import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

// "update" sayfası PageName tipine eklendi
type PageName = "home" | "events" | "add" | "detail" | "update";

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

  const menuItems: { id: PageName; label: string }[] = [
    { id: "home", label: "Ana Sayfa" },
    { id: "events", label: "Etkinlikler" },
    { id: "add", label: "Ekle" },
  ];

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const formatDate = (dateStr: string) => dateStr.split("-").join(".");

  function renderCard(event: CampusEvent) {
    return (
      // className="kart" yerine "card" yazdık
      <article className="card" key={event.id}>
        {/* Afiş görselini ana sayfadaki kartlarda göstermiyoruz (görsele uygun olarak) */}
        <div>
          <h3 style={{ marginBottom: "5px" }}>{event.title}</h3>
          <span className="kategori-etiketi">{event.category}</span>
          
          <p>Tarih: {formatDate(event.date)}, {event.time}</p>
          <p>Yer: {event.location}</p>
          <p>Kontenjan: {event.capacity} kişi</p>
          <p>{event.description}</p>
          
          {/* className="btn-primary" yerine "btn-detail" kullandık */}
          <button 
            className="btn-detail" 
            onClick={() => go("detail", event.id)}
          >
            Detayları gör
          </button>
        </div>
      </article>
    );
  }

  const categories = [...new Set(events.map(e => e.category))];

  const filteredEvents = filterByCategory(
    searchEvents(events, searchText), 
    selectedCategory
  );

  // 1. Seçili etkinliği hesaplıyoruz (findEventById)
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  return (
    <>
      <header className="navbar">
        <div className="header-inner">
          <h1>Kampüs Etkinlikleri</h1>
          <p className="header-subtitle">
            Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.
          </p>
          <nav>
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={page === item.id ? "active" : ""}
                aria-current={page === item.id ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="container">
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="events-grid home-grid">
              {upcoming.map(renderCard)}
            </section>
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
            <div className="filtre-alani" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
              <input 
                type="search" placeholder="Etkinlik ara..." 
                value={searchText} onChange={(e) => setSearchText(e.target.value)} 
                style={{ padding: '8px', flex: 1 }}
              />
              <select 
                value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as Category | "")}
                style={{ padding: '8px' }}
              >
                <option value="">Tüm Kategoriler</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <p style={{ marginBottom: '20px', fontWeight: 'bold' }}>
              {filteredEvents.length === 0 ? "Aradığınız kriterlere uygun etkinlik bulunamadı." : `${filteredEvents.length} etkinlik bulundu.`}
            </p>
            <section className="events-grid">
              {filteredEvents.map(renderCard)}
            </section>
          </>
        )}

        {/* Adım 13: Ekle ve Güncelle sayfaları için ortak form */}
        {(page === "add" || page === "update") && (
          <div className="form-container">
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <form 
              className="form" 
              onSubmit={(e) => e.preventDefault()} 
              style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "600px", marginTop: "20px" }}
            >
              <div>
                <label htmlFor="title" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Etkinlik Adı</label>
                <input type="text" id="title" maxLength={80} style={{ width: "100%", padding: "8px" }} />
              </div>
              
              <div>
                <label htmlFor="category" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Kategori</label>
                <select id="category" style={{ width: "100%", padding: "8px" }}>
                  <option value="">Seçiniz...</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label htmlFor="date" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Tarih</label>
                  <input type="date" id="date" style={{ width: "100%", padding: "8px" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label htmlFor="time" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Saat</label>
                  <input type="time" id="time" style={{ width: "100%", padding: "8px" }} />
                </div>
              </div>

              <div>
                <label htmlFor="location" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Konum</label>
                <input type="text" id="location" maxLength={100} style={{ width: "100%", padding: "8px" }} />
              </div>

              <div>
                <label htmlFor="capacity" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Kontenjan</label>
                <input type="number" id="capacity" min={1} style={{ width: "100%", padding: "8px" }} />
              </div>

              <div>
                <label htmlFor="description" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Açıklama</label>
                <textarea id="description" rows={5} maxLength={500} style={{ width: "100%", padding: "8px" }} />
              </div>

              <button type="submit" className="btn-primary" style={{ padding: "10px", marginTop: "10px" }}>
                Kaydet
              </button>
            </form>
          </div>
        )}

        {/* 2. Bulunamazsa: hata kutusu + "Listeye dön" */}
        {page === "detail" && !selected && (
          <div className="hata-kutusu" style={{ textAlign: "center", padding: "40px" }}>
            <h2>Etkinlik Bulunamadı</h2>
            <p>Aradığınız etkinlik silinmiş veya taşınmış olabilir.</p>
            <button className="btn-primary" onClick={() => go("events")}>Listeye Dön</button>
          </div>
        )}

        {/* 3. Bulunursa: detay bloğu */}
        {page === "detail" && selected && (
          <article className="detay">
            {/* 7. Detayda ana başlık etkinliğin adı olsun */}
            <h2 style={{ marginBottom: "20px" }}>{selected.title}</h2>
            
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {/* 4. Afiş sadece varsa görünsün */}
              {selected.image && (
                <figure style={{ flex: "1", minWidth: "300px", margin: "0" }}>
                  <img src={selected.image} alt={selected.title} style={{ width: "100%", borderRadius: "8px" }} />
                </figure>
              )}

              {/* 5. Künye: tarih, yer, kategori, kontenjan */}
              <div className="kunye" style={{ flex: "2", minWidth: "300px" }}>
                <p><strong>Kategori:</strong> {selected.category}</p>
                <p><strong>Tarih:</strong> {formatDate(selected.date)} - <strong>Saat:</strong> {selected.time}</p>
                <p><strong>Konum:</strong> {selected.location}</p>
                <p><strong>Kontenjan:</strong> {selected.capacity} kişi</p>
                <p style={{ marginTop: "15px", marginBottom: "20px" }}><strong>Açıklama:</strong> {selected.description}</p>
                
                {/* 6. "Bu etkinliği güncelle" -> go("update", selected.id) */}
                <button 
                  className="btn-primary" 
                  onClick={() => go("update", selected.id)}
                  style={{ marginRight: "10px" }}
                >
                  Bu etkinliği güncelle
                </button>
                <button className="btn-secondary" onClick={() => go("events")}>
                  Listeye Dön
                </button>
              </div>
            </div>
          </article>
        )}
      </main>

      <footer>
        <p>Ad Soyad: Yağmur Lök | Okul No: 2416501035 | 2026</p>
      </footer>
    </>
  );
}

export default App;