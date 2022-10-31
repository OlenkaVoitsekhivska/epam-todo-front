import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/user.action';

import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core';

import { concatMap, map, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.Signup),
      switchMap(({ user }) =>
        this.authService.handleSignup(user).pipe(
          tap(() => this.router.navigate([`/login`])),
          map((user) => UserActions.SignupSuccess({ user }))
        )
      )
    )
  );

  logUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.Login),
      switchMap(({ user }) =>
        this.authService.handleLogin(user).pipe(
          tap((res) => {
            localStorage.setItem('user', JSON.stringify(res));
            this.toastr.success('Welcome back');
            this.router.navigate([`/users/${res.id}/boards`]);
          }),
          map((user) => UserActions.LoginSuccess({ user }))
        )
      )
    )
  );

  logOutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.Logout),
      concatMap(() =>
        this.authService.handleLogout().pipe(
          tap(() => {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
          }),
          map(() => UserActions.LogoutSuccess())
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
}
