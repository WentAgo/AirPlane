import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, addDoc, collectionData, doc, getDoc } from '@angular/fire/firestore';
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
    await addDoc(bookingsRef, booking);
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
        flight.id = flightDocSnap.id;
        flights.push(flight);
      }
    }

    return flights;
  }
}
