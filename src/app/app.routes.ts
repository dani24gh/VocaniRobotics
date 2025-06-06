import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up/sign-up.page').then( m => m.SignUpPage)
  },
  {
    path: 'password',
    loadComponent: () => import('./password/password.page').then( m => m.PasswordPage)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./inicio/inicio.page').then( m => m.InicioPage)
  },
  
  {
    path: 'item-detail',
    loadComponent: () => import('./item-detail/item-detail.page').then( m => m.ItemDetailPage)
  },
  {
    path: 'rental-form',
    loadComponent: () => import('./rental-form/rental-form.page').then( m => m.RentalFormPage)
  },

];
