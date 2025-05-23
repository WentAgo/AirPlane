import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ToHufPipe } from '../../../shared/pipes/to-huf.pipe';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { Flight } from '../../../shared/models/Flight';
import { BookingService } from '../../../shared/services/booking.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-results',
  imports: [
    MatIconModule,
    MatTableModule,
    ToHufPipe,
    MatSlideToggle,
    FormsModule
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  @Input() searchResults: Flight[] = [];
  @Input() isLoggedIn: boolean = false;
  showInHuf: boolean = false;

  displayedColumns: string[] = ['from', 'to', 'date', 'price', 'seats', 'booking'];

  constructor(private bookingService: BookingService,
    private authService: AuthService) { }

  async book(flight: Flight) {
    if (this.isLoggedIn) {
      try {
        const userId = await this.authService.getUserId();
        const bookedAt = new Date().toISOString();

        await this.bookingService.bookFlight(flight, userId, bookedAt);
        alert(`Sikeres foglalás: ${flight.from} -> ${flight.to}`);
      } catch (error) {
        console.error('Hiba a foglalás során:', error);
        alert('Hiba történt a foglalás során.');
      }
    } else {
      this.login();
    }
  }

  login() {
    window.location.href = '/login';
  }

  toggleCurrency() {
    this.showInHuf = !this.showInHuf;
  }
}
