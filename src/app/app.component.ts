import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UppercasePipe } from './shared/pipes/uppercase.pipe';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    UppercasePipe,
    FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AirPlane';
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

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.authService.setIsLoggedIn(false);
    window.location.href = '/search';
  }
  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }
}
