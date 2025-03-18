import { Component, inject, signal } from '@angular/core';
import { OmdbApiService } from '../../core/services/omdb-api.service';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-movie-search',
  standalone: true,
  templateUrl: './movie-search.component.html',
  imports: [NgIf, NgForOf],
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent {
  private omdbService = inject(OmdbApiService);
  searchQuery = signal('');

  searchMovie() {
    this.omdbService.searchMovie(this.searchQuery());
  }

  get movies() {
    return this.omdbService.movies;
  }
}
