import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'people', pathMatch: 'full' },
  {
    path: 'people',
    loadComponent: () =>
      import('./people/people.component').then((mod) => mod.PeopleComponent),
  },
  { path: '**', redirectTo: 'people' },
];
