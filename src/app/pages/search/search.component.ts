import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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

@Component({
  selector: 'app-search',
  imports: [RouterLink,
    RouterLinkActive,
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
    ResultsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  isLoggedIn: boolean = false;
  private authSubscription: Subscription = new Subscription(); 

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Feliratkozunk az AuthService-ben lévő isLoggedIn változásaira
    this.authSubscription = this.authService.getIsLoggedIn().subscribe((status: boolean) => {
      this.isLoggedIn = status;  // Ha változik, frissítjük az értéket
    });
  }

  ngOnDestroy(): void {
    // Ne felejtsük el leiratkozni, hogy elkerüljük a memóriapazarlást
    this.authSubscription.unsubscribe();
  }


  countries = [
    'Magyarország', 'Németország', 'Franciaország', 'USA', 'Egyesült Királyság', 'Kanada', 'Spanyolország'
  ];

 
  searchResults = [
    { from: 'Magyarország', to: 'Németország', date: '2025-04-15', booking: false },
    { from: 'Magyarország', to: 'Franciaország', date: '2025-04-20', booking: false },
    { from: 'USA', to: 'Kanada', date: '2025-05-10', booking: false }
  ];
 

  displayedColumns: string[] = ['from', 'to', 'date', 'booking'];  // Itt adjuk meg az oszlopok nevét

  performSearch() {
    // A keresési logika, amely az eredményeket szűri és frissíti
  }

  login() {
    window.location.href = '/login';
  }

}
