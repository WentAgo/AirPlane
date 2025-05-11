import { Timestamp } from "firebase/firestore";

// src/app/models/user.model.ts
export interface User {
  uid: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birthDate: Timestamp; // ISO string, pl. "1990-05-10"
  gender?: 'férfi' | 'nő' | 'egyéb'; // opcionális
  profileImageUrl?: string;
  role?: 'user' | 'admin'; // később bővíthető
  createdAt: string; // ISO string, pl. new Date().toISOString()
}
