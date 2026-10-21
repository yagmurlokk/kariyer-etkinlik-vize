interface EventFormProps {
  onSubmit: () => void;
  categories: string[];
}

function EventForm({ onSubmit, categories }: EventFormProps) {
  return (
    <>
      <form 
        className="form" 
        onSubmit={(e) => { 
          e.preventDefault(); 
          onSubmit(); 
        }} 
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
    </>
  );
}

export default EventForm;