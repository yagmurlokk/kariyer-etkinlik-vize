import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  selectedCategory: Category | "";
  categories: string[];
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: Category | "") => void;
}

function EventFilter({ 
  searchText, 
  selectedCategory, 
  categories, 
  onSearchChange, 
  onCategoryChange 
}: EventFilterProps) {
  return (
    <div className="filtre-alani" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      <input 
        type="search" 
        placeholder="Etkinlik ara..." 
        value={searchText} 
        onChange={(e) => onSearchChange(e.target.value)} 
        style={{ padding: '8px', flex: 1 }}
      />
      <select 
        value={selectedCategory} 
        onChange={(e) => onCategoryChange(e.target.value as Category | "")}
        style={{ padding: '8px' }}
      >
        <option value="">Tüm Kategoriler</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}

export default EventFilter;