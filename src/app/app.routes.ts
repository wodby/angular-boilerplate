import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';

// Nginx answers every path that is not a file with index.html, so each route
// below also works when it is opened directly or reloaded.
export const routes: Routes = [
  { path: '', component: Home, title: 'Angular on Wodby' },
  { path: 'about', component: About, title: 'About · Angular on Wodby' },
  { path: '**', component: NotFound, title: 'Page not found · Angular on Wodby' },
];
