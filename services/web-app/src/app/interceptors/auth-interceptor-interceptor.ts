import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  //console.log('[Interceptor] Token:', token ? 'Presente' : 'Ausente');
  //console.log('[Interceptor] URL:', req.url);

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    //console.log('[Interceptor] Header Authorization adicionado');
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      //console.error('[Interceptor] Erro na requisição:', error);
      if (error.status === 401) {
        //console.log('[Interceptor] 401 detectado, fazendo logout');
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
