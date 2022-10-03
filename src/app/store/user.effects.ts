import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as UserActions from './user.action';

import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { UserI } from '../models/user.model';
import { SignupI } from '../models/signup';
import { concatMap, defer, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  //   getBoards$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(BoardActions.GetBoards),
  //       switchMap(() => {
  //         return this.boardService
  //           .getBoards()
  //           .pipe(
  //             map((boards: BoardI[]) => BoardActions.GetBoardsSuccess({ boards }))
  //           );
  //       })
  //     )
  //   );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.Signup),
      switchMap(({ user }) =>
        this.authService.handleSignup(user).pipe(
          tap((res) => this.router.navigate([`/login`])),
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
            localStorage.setItem('user', JSON.stringify(res.token));
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
            console.log('logout here');
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
          }),
          map(() => UserActions.LogoutSuccess())
        )
      )
    )
  );

  //   deleteBoard$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(BoardActions.DeleteBoard),
  //       concatMap(({ id }) => {
  //         return this.boardService
  //           .deleteBoard(id)
  //           .pipe(map(() => BoardActions.DeleteBoardSuccess()));
  //       })
  //     )
  //   );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
}
