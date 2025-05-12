import { Timestamp } from "firebase/firestore";

export interface User {
  uid: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birthDate: Timestamp;
  gender?: 'Férfi' | 'Nő' | 'Egyéb';
  profileImageUrl?: string;
  role?: 'user' | 'admin';
  createdAt: string;
}
