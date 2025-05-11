import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UppercasePipe } from './shared/pipes/uppercase.pipe';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms'; 
import { MenuComponent } from './shared/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    UppercasePipe,
    FormsModule,
    MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AirPlane';
  isLoggedIn = false; 
  private authSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      localStorage.setItem('isLoggedIn', this.isLoggedIn ? 'true' : 'false');
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  logout(): void {
    this.authService.signOut();
  }
  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }
}
