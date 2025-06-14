import { Routes } from '@angular/router';
import { HomeComponent } from './home/pages/home/home.component';

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
    loadComponent: () => import('./auth/pages/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/pages/register/register.component').then(c => c.RegisterComponent)
  },
  {
    path: 'books',
    children: [
      {
        path: 'add',
        loadComponent: () => import('./books/pages/add-book/add-book.component').then(c => c.AddBookComponent)
      },
      {
        path: 'list',
        loadComponent: () => import('./books/pages/list-books/list-books.component').then(c => c.ListBooksComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./books/pages/edit-book/edit-book.component').then(c => c.EditBookComponent)
      }
    ]
  }
];
