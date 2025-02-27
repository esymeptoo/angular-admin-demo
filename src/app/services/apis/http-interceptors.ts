import { inject } from '@angular/core';
import { withInterceptors, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';

import { AuthService } from 'services/auth.service';
import { environment } from '../../../environments/environment.local';

const SERVER_PREFIX = '/api/v1';

const httpConfigInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  let url = req.url;

  req = req.clone({
    url: `${environment.API_SERVICE}${SERVER_PREFIX}${url}`,
  });
  return next(req);
};

const AuthInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  return next(req)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        if (err.status === 401) {
          localStorage.removeItem('angular-demo-system-token');
          authService.handleUnAuthorizationError();
        }
        throw err;
      }),
    );
};

const injectTokenInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const token = localStorage.getItem('angular-demo-system-token');
  if (!token) return next(req);
  req = req.clone({
    headers: req.headers.set('Authorization', token)
  })
  return next(req);
};

export const httpInterceptorProviders = withInterceptors([
  httpConfigInterceptor,
  AuthInterceptor,
  injectTokenInterceptor,
]);
