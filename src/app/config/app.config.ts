import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {provideState, provideStore} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { movieFeature } from '../state/movie/movie.reducer';  // ✅ Importar `movieFeature`
import { MovieEffects } from '../state/movie/movie.effects';
import { CircuitBreakerInterceptor } from '../core/interceptors/circuit-breaker.interceptor';
import {appRoutes} from '../app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([CircuitBreakerInterceptor])),
    provideStore(),
    provideState(movieFeature),
    provideEffects(MovieEffects),
  ],
};
