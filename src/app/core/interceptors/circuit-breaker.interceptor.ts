import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { signal } from '@angular/core';
import { Observable, throwError, timer, switchMap, catchError } from 'rxjs';

// Estado persistente en sessionStorage
const getStoredValue = (key: string, defaultValue: number | boolean) =>
  JSON.parse(sessionStorage.getItem(key) || JSON.stringify(defaultValue));

const failureCount = signal(getStoredValue('failureCount', 0));
const open = signal(getStoredValue('circuitOpen', false));
const maxRetries = 3;
const cooldownTime = 5000; // 5 segundos

const shouldFail = (probability: number) => Math.random() < probability;

export const CircuitBreakerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  if (open()) {
    console.warn('🚨 Circuit Breaker ACTIVADO: Peticiones bloqueadas.');
    return throwError(() => new Error('Circuit Breaker está abierto 🚧'));
  }

  let attempt = 0; // Contador de intentos

  return new Observable<HttpEvent<any>>(observer => {
    const makeRequest = () => {
      attempt++;

      const failChance = attempt === 1 ? 0.8 : attempt === 2 ? 0.4 : 0.2;
      if (shouldFail(failChance)) {
        console.warn(`❌ Intento ${attempt}/${maxRetries} fallido (Probabilidad: ${failChance * 100}%)`);

        if (attempt < maxRetries) {
          // Reintentar después de 1 segundo
          timer(1000).subscribe(makeRequest);
        } else {
          // Activar Circuit Breaker si se falló 3 veces
          open.set(true);
          sessionStorage.setItem('circuitOpen', JSON.stringify(true));
          console.warn('🛑 Circuit Breaker ACTIVADO. Esperando...');

          timer(cooldownTime).subscribe(() => {
            console.log('🔄 Reintento después de  segundos...');
            failureCount.set(0);
            open.set(false);
            sessionStorage.setItem('failureCount', JSON.stringify(0));
            sessionStorage.setItem('circuitOpen', JSON.stringify(false));
            makeRequest(); // Reintentar después del cooldown
          });
        }

        return;
      }

      console.info(`✅ Intento ${attempt} exitoso.`);
      next(req).subscribe(observer);
    };

    makeRequest();
  }).pipe(
    catchError(error => {
      failureCount.set(failureCount() + 1);
      sessionStorage.setItem('failureCount', JSON.stringify(failureCount()));
      return throwError(() => error);
    })
  );
};
