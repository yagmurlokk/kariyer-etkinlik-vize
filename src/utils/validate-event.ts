import type { EventFormData, EventFormErrors } from "../types/campus-event";

export function validateEvent(data: EventFormData): EventFormErrors {
  const errors: EventFormErrors = {};

  // Etkinlik adı: En az 3 karakter
  if (data.title.trim().length < 3) {
    errors.title = "En az 3 karakter olmalı.";
  }

  // Kategori: Seçilmiş olmalı
  if (data.category === "") {
    errors.category = "Bir kategori seçin.";
  }

  // Tarih: Boş olamaz
  if (!data.date) {
    errors.date = "Tarih boş olamaz.";
  }

  // Saat: Boş olamaz
  if (!data.time) {
    errors.time = "Saat boş olamaz.";
  }

  // Yer/Konum: Boş olamaz
  if (!data.location.trim()) {
    errors.location = "Konum boş olamaz.";
  }

  // Kontenjan: 1-1000 arası tam sayı
  const capacity = Number(data.capacity);
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 1000) {
    errors.capacity = "1 ile 1000 arası tam sayı.";
  }

  // Açıklama: En az 10 karakter
  if (data.description.trim().length < 10) {
    errors.description = "En az 10 karakter olmalı.";
  }

  return errors;
}
