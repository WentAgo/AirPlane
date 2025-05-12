import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../shared/services/booking.service';
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
    private bookingService: BookingService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    const userId = await this.authService.getUserId();
    this.bookings = await this.bookingService.getUserBookings(userId);
  }

  async onFilter() {
    const userId = await this.authService.getUserId();
    const filteredBookings = await this.bookingService.getFilteredBookings(
      userId,
      this.startDate,
      this.endDate,
      this.from,
      this.to
    );
    console.log('Filtered bookings:', filteredBookings);

    this.bookings = filteredBookings;
  }

  async confirmDelete(booking: Flight) {
    const confirmed = window.confirm(`Biztosan törölni szeretnéd ezt a foglalást?\n\n${booking.from} → ${booking.to} (${booking.date})`);
    if (confirmed && booking.id) {
      try {
        await this.bookingService.deleteBooking(booking.id);
        this.bookings = this.bookings.filter(b => b.id !== booking.id);
        console.log('Törlés sikeres');
      } catch (error) {
        console.error('Hiba történt a törlés közben:', error);
      }
    }
  }

}
