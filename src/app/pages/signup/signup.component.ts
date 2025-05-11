import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { Firestore, doc, setDoc, getFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-signup',
  imports: [RouterLink,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private firestore: Firestore
  ) { }

  signUpForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    gender: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required])
  });


  isLoading = false;
  showForm = true;
  signupError = '';

signup(): void {
  if (this.signUpForm.invalid) {
    this.signupError = 'Kérlek, javítsd a hibákat a beküldés előtt.';
    return;
  }

  const password = this.signUpForm.get('password')?.value;
  const rePassword = this.signUpForm.get('rePassword')?.value;

  if (password !== rePassword) {
    this.signupError = 'A megadott jelszavak nem egyeznek.';
    return;
  }

  this.isLoading = true;
  this.showForm = false;

  const firstname = this.signUpForm.get('firstname')?.value || '';
  const lastname = this.signUpForm.get('lastname')?.value || '';
  const email = this.signUpForm.get('email')?.value || '';
  const pw = this.signUpForm.get('password')?.value || '';
  const phone = this.signUpForm.get('phone')?.value || '';
  const birthDate = this.signUpForm.get('birthDate')?.value;
  const gender = this.signUpForm.get('gender')?.value || '';

  const userData = {
    firstname,
    lastname,
    email,
    phone,
    birthDate,
    gender
  };

    this.authService.signUp(email, pw, userData)
    .then(userCredential => {
  const uid = userCredential.user?.uid;
  if (uid) {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);

    // Add uid to the userData before saving
    const completeUserData = {
      ...userData,
      uid  // így bekerül mezőként is
    };

    setDoc(userRef, completeUserData)
      .then(() => {
        console.log('Felhasználói adatok elmentve Firestore-ba.');
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/search');
      })
      .catch(error => {
        console.error('Hiba a Firestore mentés során:', error);
        this.signupError = 'Sikerült regisztrálni, de az adatok mentése sikertelen volt.';
        this.isLoading = false;
        this.showForm = true;
      });
  }
})
    .catch(error => {
      console.error('Regisztrációs hiba:', error);
      this.isLoading = false;
      this.showForm = true;

      switch (error.code) {
        case 'auth/email-already-in-use':
          this.signupError = 'Ez az e-mail cím már használatban van.';
          break;
        case 'auth/invalid-email':
          this.signupError = 'Hibás e-mail cím.';
          break;
        case 'auth/weak-password':
          this.signupError = 'A jelszó túl gyenge. Legalább 6 karakter hosszú legyen.';
          break;
        default:
          this.signupError = 'Ismeretlen hiba történt. Próbáld meg később.';
      }
    });
}



  countries = [
    'Magyarország', 'Németország', 'Franciaország', 'USA', 'Egyesült Királyság', 'Kanada', 'Spanyolország'
  ];



}
