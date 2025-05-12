import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BookingsService } from '../../shared/services/booking.service';
import { AuthService } from '../../shared/services/auth.service';
import { Flight } from '../../shared/models/Flight';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent implements OnInit {

  displayedColumns: string[] = ['from', 'to', 'date'];
  bookings: Flight[] = [];

  constructor(
    private bookingsService: BookingsService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const userId = await this.authService.getUserId(); // már async metódus
    this.bookings = await this.bookingsService.getUserBookings(userId);
  }
}
