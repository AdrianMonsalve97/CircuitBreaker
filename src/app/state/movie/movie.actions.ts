import { createAction, props } from '@ngrx/store';
import { Movie } from '../models/movie.model';

export const loadMovies = createAction('[Movie] Load Movies', props<{ query: string }>());
export const loadMoviesSuccess = createAction('[Movie] Load Movies Success', props<{ movies: Movie[] }>());
export const loadMoviesFailure = createAction('[Movie] Load Movies Failure', props<{ error: string }>());
