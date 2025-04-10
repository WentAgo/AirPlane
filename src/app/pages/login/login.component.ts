import { Component } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');
  isLoading: boolean = false;
  showLoginForm: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.email.value === 'teszt@teszt.com' && this.password.value === '123456') {
      this.authService.setIsLoggedIn(true);
      this.isLoading = true;
      this.showLoginForm = false;
      setTimeout(() => {
        this.router.navigate(['/search']);
      }, 300);
      
    } else {
      alert('Kérlek add meg a helyes adatokat!');
    }
  }
  
}

