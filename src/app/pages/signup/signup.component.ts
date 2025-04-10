import { Component } from '@angular/core';
import { RouterLink,} from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';


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
    CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  
  countries = [
    'Magyarország', 'Németország', 'Franciaország', 'USA', 'Egyesült Királyság', 'Kanada', 'Spanyolország'
  ];

  

}
