import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {MovieEffects} from '../movie/movie.effects';
import {movieReducer} from '../movie/movie.reducer';


export const storeConfig = [
  provideStore(),
  provideState({ name: 'movies', reducer: movieReducer }),
  provideEffects(MovieEffects)
];
