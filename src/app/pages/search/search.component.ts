import { Component} from '@angular/core';
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
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { ResultsComponent } from './results/results.component';
import { FormsModule } from '@angular/forms';
import { searchResults } from '../../shared/search-data';
import {User} from '../../shared/models/User';

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
  isLoggedIn = false;
  private authSubscription: Subscription = new Subscription();
  searchResults = searchResults;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }


  countries = [
    'Magyarország', 'Németország', 'Franciaország', 'USA', 'Egyesült Királyság', 'Kanada', 'Spanyolország'
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
