import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { ResultsComponent } from './results/results.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
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
    FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  isLoggedIn: boolean = false;
  private authSubscription: Subscription = new Subscription(); 

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.getIsLoggedIn().subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }


  countries = [
    'Magyarország', 'Németország', 'Franciaország', 'USA', 'Egyesült Királyság', 'Kanada', 'Spanyolország'
  ];

 
  searchResults = [
    { from: 'Magyarország', to: 'Németország', date: '2025-04-10', price: '60000 Ft', seats: 13 },
    { from: 'USA', to: 'Kanada', date: '2025-05-22', price: '200 $', seats: 4 },
    { from: 'Franciaország', to: 'Spanyolország', date: '2025-06-03', price: '200 $', seats: 4 },
    { from: 'Egyesült Királyság', to: 'Magyarország', date: '2025-05-15', price: '150000 Ft', seats: 6 },
    { from: 'Kanada', to: 'USA', date: '2025-06-30', price: '200 $', seats: 3 },
    { from: 'Németország', to: 'Franciaország', date: '2025-04-25', price: '200 $', seats: 2 },
    { from: 'Spanyolország', to: 'Egyesült Királyság', date: '2025-05-12', price: '200 $', seats: 1 },
    { from: 'USA', to: 'Németország', date: '2025-06-08', price: '600 $', seats: 1 },
    { from: 'Magyarország', to: 'Kanada', date: '2025-04-18', price: '180000 Ft', seats: 9 },
    { from: 'Franciaország', to: 'USA', date: '2025-06-20', price: '500 $', seats: 1 },
    { from: 'Németország', to: 'Spanyolország', date: '2025-05-07', price: '300 $', seats: 1 },
    { from: 'Egyesült Királyság', to: 'Franciaország', date: '2025-04-14', price: '300 $', seats: 13 },
    { from: 'Kanada', to: 'Magyarország', date: '2025-05-26', price: '180000 Ft', seats: 14 },
    { from: 'Spanyolország', to: 'Németország', date: '2025-06-11', price: '300 $', seats: 15 },
    { from: 'USA', to: 'Egyesült Királyság', date: '2025-04-30', price: '300 $', seats: 15 },
    { from: 'Magyarország', to: 'Franciaország', date: '2025-05-03', price: '90000 Ft', seats: 12 },
    { from: 'Németország', to: 'USA', date: '2025-06-22', price: '600 $', seats: 1 },
    { from: 'Franciaország', to: 'Kanada', date: '2025-04-08', price: '400 $', seats: 7 },
    { from: 'Kanada', to: 'Spanyolország', date: '2025-05-19', price: '300 $', seats: 13 },
    { from: 'Egyesült Királyság', to: 'USA', date: '2025-06-17', price: '300 $', seats: 5 },
  ];
  
  

  displayedColumns: string[] = ['from', 'to', 'date', 'booking'];
  filteredResults = [...this.searchResults];

  fromCountry: string = '';
  toCountry: string = '';
  fromDate: Date | null = null;
  toDate: Date | null = null;

  performSearch(): void {
    this.filteredResults = this.searchResults.filter(result => {
      const matchesFrom = this.fromCountry ? result.from === this.fromCountry : true;
      const matchesTo = this.toCountry ? result.to === this.toCountry : true;
      const matchesFromDate = this.fromDate ? new Date(result.date) >= new Date(this.fromDate) : true;
      const matchesToDate = this.toDate ? new Date(result.date) < new Date(this.toDate) : true;

      return matchesFrom && matchesTo && matchesFromDate && matchesToDate;
    });
  }

  onSearchClick(): void {
    this.performSearch();
  }
}
