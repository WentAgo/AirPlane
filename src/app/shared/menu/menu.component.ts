import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterLink,
    RouterLinkActive,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
   // Itt tároljuk, hogy a felhasználó be van-e jelentkezve
   isLogIn = false;

   // Kijelentkezés logika (pl. token törlés, redirektálás stb.)
   logout() {
     this.isLogIn = false;
     // Itt valósítható meg a kijelentkezés (például törlöd a tárolt tokeneket, sessionStorage-t, stb.)
   }

}
