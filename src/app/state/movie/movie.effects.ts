import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OmdbApiService } from '../../core/services/omdb-api.service';
import { loadMovies, loadMoviesSuccess, loadMoviesFailure } from './movie.actions';
import { catchError, map, of, switchMap, timer } from 'rxjs';

@Injectable()
export class MovieEffects {
  private actions$ = inject(Actions);
  private omdbService = inject(OmdbApiService);

  // Circuit Breaker
  private retryCount = 0;
  private maxRetries = 3;
  private cooldownTime = 5000; // 5 segundos antes de volver a intentar

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMovies),
      switchMap(({ query }) =>
        this.omdbService.searchMovie(query).pipe(
          map(response => loadMoviesSuccess({ movies: response.search })),
          catchError(error => {
            console.error('🚨 Error en la API:', error);

            if (this.retryCount < this.maxRetries) {
              this.retryCount++;
              console.warn(`🔁 Reintentando (${this.retryCount}/${this.maxRetries})...`);
              return timer(this.cooldownTime).pipe(
                switchMap(() => of(loadMovies({ query }))) // Reintenta después de 5s
              );
            } else {
              console.error('❌ Máximo de reintentos alcanzado.');
              return of(loadMoviesFailure({ error: 'No se pudo obtener los datos después de varios intentos.' }));
            }
          })
        )
      )
    )
  );
}
