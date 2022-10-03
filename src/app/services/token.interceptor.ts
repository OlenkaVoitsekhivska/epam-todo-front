import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { currentUserSelector } from '../store/user.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let userToken = JSON.parse(localStorage.getItem('user') || '{}');
    return next.handle(
      request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + userToken),
      })
    );
  }

  // intercept(
  //   request: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   const userToken = JSON.parse(localStorage.getItem("user")).token;

  //   console.log(userToken);
  //   return next.handle(
  //     request.clone({
  //       headers: request.headers.set("Authorization", "Bearer " + userToken),
  //     })
  //   );
  // }
}
