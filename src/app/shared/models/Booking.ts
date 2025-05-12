// booking.model.ts
export interface Booking {
  id?: string;
  userId: string;        // Foglaló felhasználó Firebase UID-je
  flightId: string;      // Lefoglalt járat azonosítója
  bookedAt: string;      // Foglalás dátuma (ISO string)
}