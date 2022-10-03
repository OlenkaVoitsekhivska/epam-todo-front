import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import {
  catchError,
  switchMap,
  map,
  concatMap,
  exhaustMap,
  mergeMap,
} from "rxjs/operators";
import * as BoardActions from "./boards.action";

import { BoardService } from "../services/boards.service";
import { Injectable } from "@angular/core";
import { BoardI } from "../models/board.model";

@Injectable()
export class BoardEffects {
  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.GetBoards),
      switchMap(({ id }) => {
        return this.boardService
          .getBoards(id)
          .pipe(
            map((boards: BoardI[]) => BoardActions.GetBoardsSuccess({ boards }))
          );
      })
    )
  );

  addBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.AddBoard),
      concatMap(({ board, userId }) =>
        this.boardService
          .addBoard(board, userId)
          .pipe(map((board) => BoardActions.AddBoardSuccess({ board })))
      )
    )
  );

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.DeleteBoard),
      concatMap(({ id }) => {
        return this.boardService
          .deleteBoard(id)
          .pipe(map(() => BoardActions.DeleteBoardSuccess()));
      })
    )
  );

  updateBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.UpdateBoard),
      concatMap(({ id, board }) =>
        this.boardService
          .updateBoard(id, board)
          .pipe(map(() => BoardActions.UpdateBoardSuccess()))
      )
    )
  );

  constructor(private actions$: Actions, private boardService: BoardService) {}
}
