import { createReducer, on } from '@ngrx/store';
import { loadMovies, loadMoviesSuccess, loadMoviesFailure } from './movie.actions';
import { Movie } from '../models/movie.model';

export interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null
};

export const movieReducer = createReducer(
  initialState,
  on(loadMovies, (state) => ({ ...state, loading: true, error: null })),
  on(loadMoviesSuccess, (state, { movies }) => ({ ...state, loading: false, movies })),
  on(loadMoviesFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
