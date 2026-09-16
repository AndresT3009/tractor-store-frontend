import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { HTTP_ERROR_EVENT } from 'shared-catalog';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error(`[HTTP ${error.status}] ${req.method} ${req.url}`, error.error);
      window.dispatchEvent(
        new CustomEvent(HTTP_ERROR_EVENT, {
          detail: { status: error.status, url: req.url, message: error.message },
        })
      );
      return throwError(() => error);
    })
  );
