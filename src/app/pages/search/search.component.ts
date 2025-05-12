import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { BookingsService } from '../../shared/services/booking.service';
import { Flight } from '../../shared/models/Flight';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results/results.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  standalone: true,
   imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    ResultsComponent,
    FormsModule]
})
export class SearchComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private authSubscription: Subscription = new Subscription();
  private flightsSubscription: Subscription = new Subscription();

  searchResults: Flight[] = [];
  filteredResults: Flight[] = [];

  fromCountry: string = '';
  toCountry: string = '';
  fromDate: Date | null = null;
  toDate: Date | null = null;

countries = [
    'Magyarország', 'Németország', 'Franciaország', 'Olaszország', 'Egyesült Királyság', 'Japán', 'Amerikai Egyesült Államok', 'Ausztrália'
  ];

  displayedColumns: string[] = ['from', 'to', 'date', 'booking'];

  constructor(
    private authService: AuthService,
    private bookingsService: BookingsService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Járatok lekérése Firestore-ból
    this.flightsSubscription = this.bookingsService.getAllFlights().subscribe((flights) => {
      this.searchResults = flights;
      this.filteredResults = flights;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.flightsSubscription.unsubscribe();
  }

  performSearch(): void {
    this.filteredResults = this.searchResults.filter(result => {
      const matchesFrom = this.fromCountry ? result.from === this.fromCountry : true;
      const matchesTo = this.toCountry ? result.to === this.toCountry : true;
      const matchesFromDate = this.fromDate ? new Date(result.date) >= new Date(this.fromDate) : true;
      const matchesToDate = this.toDate ? new Date(result.date) <= new Date(this.toDate) : true;

      return matchesFrom && matchesTo && matchesFromDate && matchesToDate;
    });
  }

  onSearchClick(): void {
    this.performSearch();
  }
}
