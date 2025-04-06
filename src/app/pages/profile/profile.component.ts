import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { UppercasePipe } from '../../shared/pipes/uppercase.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-profile',
  imports: [RouterLink,
    RouterLinkActive,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    UppercasePipe,
    CommonModule,
    FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

 
}
