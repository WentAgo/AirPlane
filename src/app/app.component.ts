import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MenuComponent } from './shared/menu/menu.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, BookingsComponent, LoginComponent, ProfileComponent, SearchComponent, SignupComponent, MenuComponent,PagenotfoundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AirPlane';
  isLoggedIn = false;

  constructor(){}
  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
    window.location.href = '/home';
  }
}
