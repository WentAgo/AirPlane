import { Component, SimpleChanges } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MenuComponent } from './shared/menu/menu.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UppercasePipe } from './shared/pipes/uppercase.pipe';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    RouterLink,
    BookingsComponent,
    LoginComponent,
    ProfileComponent,
    SearchComponent,
    SignupComponent,
    MenuComponent,
    PagenotfoundComponent,
    MatSidenav,
    MatSidenavModule,
    MatToolbarModule,
    UppercasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AirPlane';
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


  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.authService.setIsLoggedIn(false);
    window.location.href = '/search';
  }
  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }
}
