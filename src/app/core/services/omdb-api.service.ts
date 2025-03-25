import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, throwError, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OmdbApiService {
  private http = inject(HttpClient);
  private API_URL = environment.API_URL;
  private API_KEY = environment.API_KEY;

  movies = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  private handleError(error: any): Observable<any> {
    console.error('⚠️ Error en API:', error);
    this.error.set(`No se pudieron obtener los datos.`);
    this.loading.set(false); // ✅ Asegurar que loading se detiene
    return throwError(() => new Error('🔥 Circuit Breaker activado: Fallos consecutivos.'));
  }

  searchMovie(title: string): Observable<any> {
    this.loading.set(true);
    this.error.set(null);

    const params = new HttpParams()
      .set('apikey', this.API_KEY)
      .set('t', title);

    return this.http.get<any>(this.API_URL, { params }).pipe(
      tap((response) => {
        if (response.Response === 'True') {
          this.movies.set(response.Search || []);
        } else {
          this.error.set('No se encontraron películas.');
          this.movies.set([]); // ✅ Evitar undefined en el array
        }
        this.loading.set(false);
      }),
      catchError(error => this.handleError(error))
    );
  }
}
