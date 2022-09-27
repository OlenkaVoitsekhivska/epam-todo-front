import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map, concatMap } from 'rxjs/operators';
import * as BoardActions from './boards.action';

import { BoardService } from '../services/boards.service';
import { Injectable } from '@angular/core';
import { BoardI } from '../models/board.model';

@Injectable()
export class BoardEffects {
  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.GetBoards),
      switchMap(() => {
        return this.boardService
          .getBoards()
          .pipe(
            map((boards: BoardI[]) => BoardActions.GetBoardsSuccess({ boards }))
          );
      })
    )
  );

  addBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.AddBoard),
      concatMap(({ board }) =>
        this.boardService
          .addBoard(board)
          .pipe(map(() => BoardActions.AddBoardSuccess()))
      )
    )
  );

  // deleteBoard$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(BoardActions.DeleteBoard),
  //     concatMap(({ id }) =>
  //       this.boardService
  //         .deleteBoard(id)
  //         .pipe(map(() => BoardActions.DeleteBoardSuccess()))
  //     )
  //   )
  // );

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.DeleteBoard),
      concatMap(({ id }) =>
        this.boardService
          .deleteBoard(id)
          .pipe(map(() => BoardActions.DeleteBoardSuccess()))
      )
    )
  );

  updateBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.UpdateBoard),
      concatMap(({ board }) =>
        this.boardService
          .updateBoard(board)
          .pipe(map(() => BoardActions.UpdateBoardSuccess()))
      )
    )
  );

  constructor(private actions$: Actions, private boardService: BoardService) {}
}
