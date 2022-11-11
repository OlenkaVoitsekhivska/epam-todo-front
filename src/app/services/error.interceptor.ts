import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.toastr.error(errorMessage, 'Error', {
          timeOut: 3000,
        });
        if (error.status !== 409) {
          this.router.navigate(['login']);
        }
        return throwError(error);
      })
    );
  }
}
