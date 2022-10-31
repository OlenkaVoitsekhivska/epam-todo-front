import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let userToken = JSON.parse(localStorage.getItem('user') || '{}').token;
    return next.handle(
      request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + userToken),
      })
    );
  }
}
