import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentUserSelector } from '../store/selectors/user.selectors';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RedirGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let userToken = JSON.parse(localStorage.getItem('user') || '{}').token;
    if (!userToken) {
      this.router.navigate(['login']);
    }
    return userToken;
  }
}
