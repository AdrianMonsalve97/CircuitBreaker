import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgIf, NgForOf, JsonPipe } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { selectAllMovies, selectError, selectLoading } from '../../state/movie/movie.selectors';
import { loadMovies } from '../../state/movie/movie.actions';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-movie-search',
  standalone: true,
  templateUrl: './movie-search.component.html',
  imports: [NgIf, NgForOf, MovieCardComponent, FormsModule],
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent {
  private store = inject(Store);
  searchQuery = signal('');

  movies = toSignal(this.store.select(selectAllMovies).pipe(
    map((movies: any) => movies ?? [])
  ), { initialValue: [] });

  loading = toSignal(this.store.select(selectLoading), { initialValue: false });
  error = toSignal(this.store.select(selectError), { initialValue: null });

  searchMovies() {
    if (!this.searchQuery()) return;
    this.store.dispatch(loadMovies({ query: this.searchQuery() }));
  }

  protected readonly Boolean = Boolean;
}
