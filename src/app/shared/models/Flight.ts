// flights.model.ts
export interface Flight {
  id: string;
  from: string;          // Honnan?
  to: string;            // Hova?
  date: string;          // Mikor? (ISO string pl. "2025-05-11")
  price: number;         // Ár
  seats: number;         // Elérhető helyek száma
}