import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-results',
  imports: [MatIconModule,
    MatTableModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  @Input() searchResults: any[] = [];
  @Input() isLoggedIn: boolean = false;

  displayedColumns: string[] = ['from', 'to', 'date', 'booking'];



  book(result: any) {
    if (this.isLoggedIn) {
      alert(`Lefoglaltad: ${result.from} -> ${result.to} (${result.date})`);
      result.booking = true;
    } else {
      this.login();
    }
  }

  login() {
    window.location.href = '/login';
  }


}
