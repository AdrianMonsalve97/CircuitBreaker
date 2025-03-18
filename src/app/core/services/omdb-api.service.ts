import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OmdbApiService {
  private http = inject(HttpClient);
  private API_URL = environment.apiUrl;

  movies = signal<any[]>([]);

  searchMovie(title: string): Observable<any> {
    return this.http.get(`${this.API_URL}${title}`).pipe(
      catchError(error => {
        console.error('⚠️ Error en API:', error);
        return of([]);
      })
    );
  }
}
