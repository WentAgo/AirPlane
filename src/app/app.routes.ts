import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './shared/guards/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'search',
        loadComponent: () => import('./pages/search/search.component').then(m => m.SearchComponent)
    },
    {
        path: 'bookings',
        loadComponent: () => import('./pages/bookings/bookings.component').then(m => m.BookingsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },
        {
        path: 'profile/edit',
        loadComponent: () => import('./pages/profile//edit/edit.component').then(m => m.EditComponent),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        canActivate: [publicGuard]
    },
    {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent),
        canActivate: [publicGuard]
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