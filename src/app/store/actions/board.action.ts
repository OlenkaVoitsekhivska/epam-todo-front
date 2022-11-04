import { createAction, props } from '@ngrx/store';
import { Board } from 'src/app/models/board.model';

export const getBoardById = createAction(
  '[Board] Get tasks by id',
  props<{ id: string }>()
);

export const getBoardByIdSuccess = createAction(
  '[Board] Get tasks by id success',
  props<{ board: Board }>()
);

export const updateColor = createAction(
  '[Board] Update color',
  props<{ id: string; board: any }>()
);

export const updateColorSuccess = createAction(
  '[Board] Update color success',
  props<{ id: string; board: any }>()
);
