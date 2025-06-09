import { ApplicationConfig, EnvironmentProviders, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { initializeAuth, browserSessionPersistence, browserPopupRedirectResolver, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCoQ9hiP5OgTf1jj0VEpIMU_t_imolppyQ",
  authDomain: "booksstore-fc211.firebaseapp.com",
  projectId: "booksstore-fc211",
  storageBucket: "booksstore-fc211.firebasestorage.app",
  messagingSenderId: "54893086267",
  appId: "1:54893086267:web:823ecb0c9c5cf1cc3e7e1e"
};

const fbApp = () => initializeApp(firebaseConfig);
const authApp = () => initializeAuth(fbApp(), {
  persistence: browserSessionPersistence,
  popupRedirectResolver: browserPopupRedirectResolver
});

const firebaseProviders = [
  provideFirebaseApp(fbApp),
  provideAuth(authApp),
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    firebaseProviders
  ]
};
