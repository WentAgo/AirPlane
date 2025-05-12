import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  authState,
  User,
  UserCredential
} from '@angular/fire/auth';
import { 
  Firestore, 
  collection, 
  doc, 
  setDoc 
} from '@angular/fire/firestore';
import { Observable, firstValueFrom} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<User | null>;
  
  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore
  ) {
    this.currentUser = authState(this.auth);
  }
  
  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  
  signOut(): Promise<void> {
    localStorage.setItem('isLoggedIn', 'false');
    return signOut(this.auth).then(() => {
      this.router.navigateByUrl('/search');
    });
  }

  async signUp(email: string, password: string, userData: any): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      
      await this.createUserData(userCredential.user.uid, {
        ...userData,
        id: userCredential.user.uid
      });

      return userCredential;
    } catch (error) {
      console.error('Hiba a regisztráció során:', error);
      throw error;
    }
  }

    private async createUserData(uid: string, data: any): Promise<void> {
    const userDoc = doc(this.firestore, `users/${uid}`);
    await setDoc(userDoc, data);
  }

   async getUserId(): Promise<string> {
    const user = await firstValueFrom(authState(this.auth));
    if (user) {
      return user.uid;
    } else {
      throw new Error('Nincs bejelentkezett felhasználó.');
    }
  }
  
  isLoggedIn(): Observable<User | null> {
    return this.currentUser;
  }

  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }
}