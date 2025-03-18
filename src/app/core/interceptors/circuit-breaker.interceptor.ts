import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, throwError, timer, switchMap } from 'rxjs';

@Injectable()
export class CircuitBreakerInterceptor implements HttpInterceptor {
  private failureCount = signal(0);
  private open = signal(false);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.open()) {
      console.warn('🚨 Circuit Breaker ACTIVO: Bloqueando petición.');
      return throwError(() => new Error('Circuit Breaker is OPEN'));
    }

    return next.handle(req).pipe(
      catchError(error => {
        this.failureCount.set(this.failureCount() + 1);
        if (this.failureCount() >= 3) {
          this.open.set(true);
          console.warn('🛑 Circuit Breaker activado.');
          timer(5000).subscribe(() => {
            console.log('🔄 Reintentando después de 5 segundos.');
            this.failureCount.set(0);
            this.open.set(false);
          });
        }
        return throwError(() => error);
      })
    );
  }
}
