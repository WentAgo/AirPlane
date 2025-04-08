import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ToHufPipe } from '../../../shared/pipes/to-huf.pipe';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-results',
  imports: [MatIconModule,
    MatTableModule,
    ToHufPipe,
    MatSlideToggle,
    FormsModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  @Input() searchResults: any[] = [];
  @Input() isLoggedIn: boolean = false;
  showInHuf: boolean = false;

  displayedColumns: string[] = ['from', 'to', 'date', 'price', 'seats', 'booking'];


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

  toggleCurrency() {
    this.showInHuf = !this.showInHuf;
  }

}
