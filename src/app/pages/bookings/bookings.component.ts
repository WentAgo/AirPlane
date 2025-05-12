import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BookingsService } from '../../shared/services/booking.service';
import { AuthService } from '../../shared/services/auth.service';
import { Flight } from '../../shared/models/Flight';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent implements OnInit {

  displayedColumns: string[] = ['from', 'to', 'date', 'delete'];
  bookings: Flight[] = [];
  isLoading: boolean = false;
  startDate: string = '';
  endDate: string = '';
  from: string = '';
  to: string = '';

  constructor(
    private bookingsService: BookingsService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    const userId = await this.authService.getUserId(); // már async metódus
    this.bookings = await this.bookingsService.getUserBookings(userId);
  }

 async onFilter() {
  const userId = await this.authService.getUserId(); // Async metódus a felhasználó ID-jához
  const filteredBookings = await this.bookingsService.getFilteredBookings(
    userId, 
    this.startDate, 
    this.endDate, 
    this.from, 
    this.to
  );
  console.log('Filtered bookings:', filteredBookings);
  
  // Frissítjük a bookings tömböt a lekérdezett adatokat tartalmazó tömbbel
  this.bookings = filteredBookings;
}

  async confirmDelete(booking: Flight) {
    const confirmed = window.confirm(`Biztosan törölni szeretnéd ezt a foglalást?\n\n${booking.from} → ${booking.to} (${booking.date})`);
    if (confirmed && booking.id) {
      try {
        await this.bookingsService.deleteBooking(booking.id);
        this.bookings = this.bookings.filter(b => b.id !== booking.id);
        console.log('Törlés sikeres');
      } catch (error) {
        console.error('Hiba történt a törlés közben:', error);
      }
    }
  }

}
