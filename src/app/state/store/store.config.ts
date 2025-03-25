import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { MovieEffects } from '../movie/movie.effects';
import { movieFeature } from '../movie/movie.reducer';

export const storeConfig = [
  provideStore(),
  provideState(movieFeature),
  provideEffects(MovieEffects)
];
