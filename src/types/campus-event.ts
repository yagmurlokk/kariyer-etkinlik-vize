// 1. Kategoriyi 4 değer ile sınırlandırıyoruz
export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

// 2. Bir etkinliğin hangi bilgileri içereceğini tarif ediyoruz
export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  capacity: number;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string; // Soru işareti (?) bu alanın zorunlu olmadığını (isteğe bağlı) belirtir
}

// 3. Form verileri için tip (id yok, inputlar metin ürettiği için capacity string, category boş olabilir)
export interface EventFormData {
  title: string;
  category: Category | "";
  capacity: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
}

export interface EventFormErrors {
  title?: string;
  category?: string;
  date?: string;
  time?: string;
  location?: string;
  capacity?: string;
  description?: string;
}
