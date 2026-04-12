import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search-page.component').then(m => m.SearchPageComponent)
  },
  {
    path: 'works/:id',
    loadComponent: () => import('./pages/book/book-page.component').then(m => m.BookPageComponent)
  },
  {
    path: 'downloads',
    loadComponent: () => import('./pages/downloads/downloads-page.component').then(m => m.DownloadsPageComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile-page.component').then(m => m.ProfilePageComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
