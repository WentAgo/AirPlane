import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, addDoc, collectionData, doc, getDoc, deleteDoc, setDoc, orderBy } from '@angular/fire/firestore';
import { Flight } from '../models/Flight';
import { Booking } from '../models/Booking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  constructor(private firestore: Firestore) {}

  async searchFlights(from: string, to: string, fromDate: Date, toDate: Date): Promise<Flight[]> {
    const flightsRef = collection(this.firestore, 'flights');
    const q = query(flightsRef,
      where('from', '==', from),
      where('to', '==', to),
      where('date', '>=', fromDate.toISOString().slice(0, 10)),
      where('date', '<=', toDate.toISOString().slice(0, 10))
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Flight);
  }

async bookFlight(flight: Flight, userId: string, bookedAt: string): Promise<void> {
  const bookingsRef = collection(this.firestore, 'bookings');
  const booking: Booking = {
    flightId: flight.id!,
    userId: userId,
    bookedAt: bookedAt
  };
  
  const docRef = await addDoc(bookingsRef, booking);

  // Ha az ID-t is szeretnéd eltárolni a dokumentumban:
  await setDoc(docRef, { ...booking, id: docRef.id });
}

  getAllFlights(): Observable<Flight[]> {
    const flightsRef = collection(this.firestore, 'flights');
    return collectionData(flightsRef, { idField: 'id' }) as Observable<Flight[]>;
  }

async getUserBookings(userId: string): Promise<Flight[]> {
  const bookingsRef = collection(this.firestore, 'bookings');
  const q = query(bookingsRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  const flights: Flight[] = [];

  for (const docSnap of querySnapshot.docs) {
    const bookingData = docSnap.data() as Booking;
    const flightDocRef = doc(this.firestore, 'flights', bookingData.flightId);
    const flightDocSnap = await getDoc(flightDocRef);

    if (flightDocSnap.exists()) {
      const flight = flightDocSnap.data() as Flight;
      flight.id = docSnap.id; // ← A bookings dokumentum ID-ja kerül be!
      flights.push(flight);
    }
  }

  return flights;
}

 async deleteBooking(id: string): Promise<void> {
  try {
    const bookingRef = doc(this.firestore, 'bookings', id);
    await deleteDoc(bookingRef);
    console.log(`A(z) ${id} az adatbázisból sikeresen törölve.`);
  } catch (error) {
    console.error('Hiba történt a törlés közben:', error);
    throw new Error('A törlés nem sikerült.');
  }
}
async getFilteredBookings(userId: string, startDate: string, endDate: string, from: string, to: string): Promise<Flight[]> {
  const bookingsRef = collection(this.firestore, 'bookings');
  
  // Kezdeti lekérdezés - csak a userId-t szűrjük
  let q = query(bookingsRef, where('userId', '==', userId));

  // Lekérdezzük a bookings dokumentumokat
  const querySnapshot = await getDocs(q);
  console.log('Szűrt foglalások:', querySnapshot.docs);
  
  const flights: Flight[] = [];

  // Minden foglalás dokumentum adatainak feldolgozása
  for (const docSnap of querySnapshot.docs) {
    const bookingData = docSnap.data() as Booking;

    // A foglalás flightId-jának alapján lekérdezzük a flight adatokat
    const flightDocRef = doc(this.firestore, 'flights', bookingData.flightId);
    const flightDocSnap = await getDoc(flightDocRef);

    if (flightDocSnap.exists()) {
      const flight = flightDocSnap.data() as Flight;

      // Ha van kezdő dátum, szűrjük le
      if (startDate && flight.date < startDate) {
        continue; // Ha a flight dátuma korábbi, ugorjuk át
      }

      // Ha van befejező dátum, szűrjük le
      if (endDate && flight.date > endDate) {
        continue; // Ha a flight dátuma későbbi, ugorjuk át
      }

      // Ha van "from" mező, szűrjük le
      if (from && flight.from !== from) {
        continue; // Ha nem egyezik a "from" érték, ugorjuk át
      }

      // Ha van "to" mező, szűrjük le
      if (to && flight.to !== to) {
        continue; // Ha nem egyezik a "to" érték, ugorjuk át
      }

      flight.id = docSnap.id; // Hozzáadjuk a foglalás id-ját a flight-hoz
      flights.push(flight); // Hozzáadjuk a flight-ot az eredményhez
    }
  }

  return flights;  // Visszaadjuk a szűrt adatokat
}

}
