import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list'
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-menu',
  imports: [RouterLink,
    RouterLinkActive,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatListModule,
    MatSidenav],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
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

  

  logout() {
    this.authService.setIsLoggedIn(false);
    window.location.href = '/search';
  }
}
