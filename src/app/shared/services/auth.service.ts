import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  getIsLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

  setIsLoggedIn(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }
}
