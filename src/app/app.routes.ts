import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'search',
        loadComponent: () => import('./pages/search/search.component').then(m => m.SearchComponent)
    },
    {
        path: 'bookings',
        loadComponent: () => import('./pages/bookings/bookings.component').then(m => m.BookingsComponent)
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent)
    },
    {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
    },
    {
        path: '**',
        loadComponent: () => import('./shared/pagenotfound/pagenotfound.component').then(m => m.PagenotfoundComponent)
    },
];