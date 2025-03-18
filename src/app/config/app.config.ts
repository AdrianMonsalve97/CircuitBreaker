import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { movieReducer } from '../state/movie/movie.reducer';
import { MovieEffects } from '../state/movie/movie.effects';
import { CircuitBreakerInterceptor } from '../core/interceptors/circuit-breaker.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: import('../features/movie-search/movie-search.component').then(m => m.MovieSearchComponent) }
    ]),
    provideHttpClient(withInterceptors([CircuitBreakerInterceptor])),
    provideStore({ movie: movieReducer }),
    provideEffects(MovieEffects)
  ]
};
