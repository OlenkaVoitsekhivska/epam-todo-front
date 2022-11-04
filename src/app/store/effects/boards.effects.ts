import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map, switchMap } from 'rxjs/operators';
import * as BoardActions from '../actions/boards.action';

import { BoardService } from '../../services/boards.service';
import { Injectable } from '@angular/core';
import { Board } from '../../models/board.model';

@Injectable()
export class BoardEffects {
  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getBoards),
      switchMap(({ id }) => {
        return this.boardService
          .getBoards(id)
          .pipe(
            map((boards: Board[]) => BoardActions.getBoardsSuccess({ boards }))
          );
      })
    )
  );

  addBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.addBoard),
      concatMap(({ board, userId }) =>
        this.boardService
          .addBoard(board, userId)
          .pipe(map((board) => BoardActions.addBoardSuccess({ board })))
      )
    )
  );

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.deleteBoard),
      concatMap(({ id }) => {
        return this.boardService
          .deleteBoard(id)
          .pipe(map(() => BoardActions.deleteBoardSuccess()));
      })
    )
  );

  updateBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.updateBoard),
      concatMap(({ id, board }) =>
        this.boardService
          .updateBoard(id, board)
          .pipe(map(() => BoardActions.updateBoardSuccess({ id, board })))
      )
    )
  );

  constructor(private actions$: Actions, private boardService: BoardService) {}
}
