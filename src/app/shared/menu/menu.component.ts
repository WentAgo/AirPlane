import { Component} from '@angular/core';
import { RouterLink} from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list'
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-menu',
  imports: [RouterLink,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatListModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
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

  logout() {
    this.authService.setIsLoggedIn(false);
    window.location.href = '/search';
  }
}
