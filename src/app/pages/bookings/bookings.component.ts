import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
  imports: [RouterLink,
    RouterLinkActive,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent implements OnInit{

  displayedColumns: string[] = ['from', 'to', 'date'];
  bookings: { from: string, to: string, date: string }[] = [];

  ngOnInit(): void {
    // Példa adatok – ezeket később backendről vagy service-ből érdemes tölteni
    this.bookings = [
      { from: 'Budapest', to: 'Bécs', date: '2025-04-10 08:00' },
      { from: 'Berlin', to: 'Prága', date: '2025-04-15 12:30' }
    ];
  }

}
