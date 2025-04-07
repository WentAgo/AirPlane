import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject, amely alapértelmezetten false-ra van állítva
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  // Getter a bejelentkezési állapot lekéréséhez
  getIsLoggedIn() {
    return this.isLoggedInSubject.asObservable();  // Visszaadjuk az Observable-t
  }

  // Setter a bejelentkezési állapot módosításához
  setIsLoggedIn(status: boolean): void {
    this.isLoggedInSubject.next(status);  // Módosítjuk az értéket
  }
}
