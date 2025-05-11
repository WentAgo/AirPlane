import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/User';
import { Injectable, NgZone } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private ngZone: NgZone
  ) { }

  getUserProfile(): Observable<{ user: User | null }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({ user: null });
        }
        return from(this.fetchUser(authUser.uid));
      })
    );
  }

fetchUser(uid: string): Promise<{ user: User }> {
  const docRef = doc(this.firestore, `users/${uid}`);
  return getDoc(docRef).then(snapshot => {
    const data = snapshot.data() as User;
    return this.ngZone.run(() => ({ user: data })); // <-- fontos!
  });
}

 updateUser(updatedUser: User): Observable<void> {
  // Ellenőrizzük, hogy az updatedUser.uid érvényes és nem undefined
  if (!updatedUser.uid || typeof updatedUser.uid !== 'string') {
    console.error('Az UID nem található vagy nem string típusú');
    return throwError('Az UID nem található vagy nem string típusú');
  }

  // Firestore dokumentum referencia a felhasználóhoz
  const userDocRef = doc(this.firestore, 'users', updatedUser.uid);

  // A felhasználó adatainak frissítése a Firestore-ban
  return from(setDoc(userDocRef, updatedUser));
}

}
