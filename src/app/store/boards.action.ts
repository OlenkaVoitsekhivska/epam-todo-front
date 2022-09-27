import { createAction, props } from '@ngrx/store';
import {BoardI} from '../models/board.model'

export const SetCurrentBoard = createAction(
  '[Board] Set current board',
  props<{ id: string }>()
);

export const GetCurrentBoard = createAction(
  '[Board] Getcurrent board'
)

export const GetBoards = createAction(
  '[Board] Get boards'
);

export const GetBoardsSuccess = createAction(
  '[Board] Get boards success',
  props<{boards:BoardI[]}>()
)

export const AddBoard = createAction(
  '[Board] Add board',
  props<{board:BoardI}>()
)

export const AddBoardSuccess = createAction(
  '[Board] Add board success',
)

export const DeleteBoard = createAction(
  '[Board] Deete board',
  props<{id:string}>()
)

export const DeleteBoardSuccess = createAction(
  '[Board] Delete board success',

)

export const UpdateBoard = createAction(
  '[Board] Update board',
  props<{board:BoardI}>()
)

export const UpdateBoardSuccess = createAction(
  '[Board] Update board success'
)