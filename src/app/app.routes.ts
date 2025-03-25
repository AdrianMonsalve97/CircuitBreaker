import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/movie-search/movie-search.component').then(
        (m) => m.MovieSearchComponent
      ),
  }

];
