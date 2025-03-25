import {createSelector} from '@ngrx/store';
import {movieFeature} from './movie.reducer';

export const {
  selectMoviesState,
  selectMovies,
  selectError,
  selectLoading
} = movieFeature;

export const selectAllMovies = createSelector(
  selectMoviesState,
  (state) => state?.movies ?? []
);
