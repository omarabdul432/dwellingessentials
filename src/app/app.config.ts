import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"dwellingessentials-8da12","appId":"1:539714991005:web:eb9bfce5a0992193473574","storageBucket":"dwellingessentials-8da12.appspot.com","apiKey":"AIzaSyDleGvR5BYgXsH5g_i2SAStrkxUCp4YUPo","authDomain":"dwellingessentials-8da12.firebaseapp.com","messagingSenderId":"539714991005"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
