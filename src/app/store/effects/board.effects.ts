import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import * as BoardActions from '../actions/board.action';

import { BoardService } from '../../services/boards.service';
import { Injectable } from '@angular/core';
import { Board } from 'src/app/models/board.model';

@Injectable()
export class SingleBoardEffects {
  getBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getBoardById),
      switchMap(({ id }) => {
        return this.boardService
          .getBoardById(id)
          .pipe(
            map((board: Board) => BoardActions.getBoardByIdSuccess({ board }))
          );
      })
    )
  );

  updateColor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.updateColor),
      concatMap(({ id, color }) =>
        this.boardService
          .updateColor(id, color)
          .pipe(map(() => BoardActions.updateColorSuccess({ id, color })))
      )
    )
  );

  constructor(private actions$: Actions, private boardService: BoardService) {}
}
