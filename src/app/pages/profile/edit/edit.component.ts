import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/User';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-edit',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  user: User | null = null;
  errorMessage: string = '';
  editForm!: FormGroup;
  originalUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(profile => {
      this.originalUser = profile.user;

      if (this.originalUser) {
        this.editForm = this.fb.group({
          firstname: [this.originalUser.firstname, [Validators.required, Validators.minLength(2)]],
          lastname: [this.originalUser.lastname, [Validators.required, Validators.minLength(2)]],
          email: [this.originalUser.email, [Validators.required, Validators.email]],
          phone: [this.originalUser.phone, [Validators.required]],
          gender: [this.originalUser.gender || ''],
          birthDate: [this.originalUser.birthDate.toDate(), Validators.required]
        });
      }
    });
  }

  saveProfile(): void {
    if (this.editForm.valid && this.originalUser) {
      const formValue = this.editForm.value;

      const updatedUser: User = {
        ...this.originalUser,
        firstname: formValue.firstname,
        lastname: formValue.lastname,
        email: formValue.email,
        phone: formValue.phone,
        gender: formValue.gender,
        birthDate: Timestamp.fromDate(formValue.birthDate)
      };

      if (updatedUser.uid) {
        this.userService.updateUser(updatedUser).subscribe({
          next: () => {
            this.router.navigate(['/profile']);
          },
          error: (err) => {
            this.errorMessage = 'Hiba történt a mentés során.';
            console.error(err);
          }
        });
      } else {
        console.error('A felhasználó UID-ja nem található!');
        this.errorMessage = 'A felhasználó azonosítója nem található!';
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }
}
