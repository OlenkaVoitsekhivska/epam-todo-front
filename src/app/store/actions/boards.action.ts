import { createAction, props } from '@ngrx/store';
import { Board } from '../../models/board.model';

export const getBoards = createAction(
  '[Board] Get boards',
  props<{ id: string }>()
);

export const getBoardsSuccess = createAction(
  '[Board] Get boards success',
  props<{ boards: Board[] }>()
);

export const AddBoard = createAction(
  '[Board] Add board',
  props<{ board: Board; userId: string }>()
);

export const AddBoardSuccess = createAction(
  '[Board] Add board success',
  props<{ board: Board }>()
);

export const deleteBoard = createAction(
  '[Board] Deete board',
  props<{ id: string }>()
);

export const deleteBoardSuccess = createAction('[Board] Delete board success');

export const updateBoard = createAction(
  '[Board] Update board',
  props<{ id: string; board: Partial<Board> }>()
);

export const updateBoardSuccess = createAction(
  '[Board] Update board success',
  props<{ id: string; board: Partial<Board> }>()
);
