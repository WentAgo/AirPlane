import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideFirebaseApp(() =>
    initializeApp({
      projectId: "airplane-d7244",
      appId: "1:129672907294:web:883d224295d232766c7c0f",
      storageBucket: "airplane-d7244.firebasestorage.app",
      apiKey: "AIzaSyAz6I_s3mj5LUrfOOH6x1u7Di99AlQt0-w",
      authDomain: "airplane-d7244.firebaseapp.com", messagingSenderId: "129672907294"
    })),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore())]
};