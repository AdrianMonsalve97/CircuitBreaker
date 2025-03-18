import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MovieState } from './movie.reducer';

export const selectMovieState = createFeatureSelector<MovieState>('movies');

export const selectAllMovies = createSelector(selectMovieState, (state) => state.movies);
export const selectLoading = createSelector(selectMovieState, (state) => state.loading);
export const selectError = createSelector(selectMovieState, (state) => state.error);
