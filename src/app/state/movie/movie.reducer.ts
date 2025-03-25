import { createFeature, createReducer, on } from '@ngrx/store';
import { loadMovies, loadMoviesSuccess, loadMoviesFailure } from './movie.actions';

export interface MovieState {
  movies: any[];
  loading: boolean;
  error: string | null;
}

export const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null
};

export const movieFeature = createFeature({
  name: 'movies',
  reducer: createReducer(
    initialState,
    on(loadMovies, (state) => ({
      ...state,
      loading: true,
      error: null
    })),
    on(loadMoviesSuccess, (state, { movies }) => ({
      ...state,
      movies,
      loading: false,
      error: null
    })),
    on(loadMoviesFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    }))
  )
});

export const {
  selectMoviesState,
  selectMovies,
  selectError,
  selectLoading
} = movieFeature;
