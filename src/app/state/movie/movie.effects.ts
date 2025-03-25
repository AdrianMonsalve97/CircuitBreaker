import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OmdbApiService } from '../../core/services/omdb-api.service';
import { loadMovies, loadMoviesSuccess, loadMoviesFailure } from './movie.actions';
import {catchError, map, of, concatMap, timer, switchMap} from 'rxjs';
import {Movie} from '../models/movie.model';

@Injectable()
export class MovieEffects {
  private actions$ = inject(Actions);
  private omdbService = inject(OmdbApiService);

  private retryCount = 0;
  private maxRetries = 3;
  private cooldownTime = 5000;

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMovies),
      switchMap(({ query }) =>
        this.omdbService.searchMovie(query).pipe(
          map(response => {
            if (response.Response === 'True') {
              return loadMoviesSuccess({ movies: [Movie.fromJson(response)] });
            } else {
              return loadMoviesFailure({ error: 'Película no encontrada' });
            }
          }),
          catchError(error => {
            console.error('🚨 Error en la API:', error);
            return of(loadMoviesFailure({ error: 'Error en la API' }));
          })
        )
      )
    )
  );

}
