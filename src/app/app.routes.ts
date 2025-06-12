import { Routes } from '@angular/router';
import { HomeComponent } from '../home/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    loadComponent: () => import('../auth/pages/login/login.component').then(mod => mod.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('../auth/pages/register/register.component').then(mod => mod.RegisterComponent)
  }
];
