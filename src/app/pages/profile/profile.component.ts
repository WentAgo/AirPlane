import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../../shared/models/User';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Timestamp } from 'firebase/firestore';
import { formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isLoading = true;
  private subscription: Subscription | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.subscription = this.authService.isLoggedIn().subscribe({
      next: (user) => {
        if (user) {
          this.loadFirestoreUserData(user.uid);
        } else {
          console.error('Nincs bejelentkezett felhasználó');
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Hiba a bejelentkezett felhasználó betöltésekor:', error);
        this.isLoading = false;
      }
    });
  }

  loadFirestoreUserData(uid: string): void {
    const userDocRef = doc(this.firestore, 'users', uid);
    getDoc(userDocRef).then((docSnap) => {
      if (docSnap.exists()) {
        this.user = docSnap.data() as User;
        this.isLoading = false;
      } else {
        console.error('A felhasználói adatok nem találhatók');
        this.isLoading = false;
      }
    });
  }
  getUserInitials(): string {
    if (!this.user) return '?';

    const firstInitial = this.user.firstname ? this.user.firstname.charAt(0).toUpperCase() : '';
    const lastInitial = this.user.lastname ? this.user.lastname.charAt(0).toUpperCase() : '';

    return firstInitial + (lastInitial ? lastInitial : '');
  }

  getSafeString(value: string | undefined): string {
    return value || 'N/A';
  }


  formatBirthDate(birthDate: Timestamp | undefined): string {
    if (!birthDate) return '';
    const dateObj = birthDate.toDate();
    return formatDate(dateObj, 'yyyy. MMMM d.', 'en-US');
  }

  goToEdit(): void {
    this.router.navigate(['/profile/edit']);
  }

}
