import { createSelector } from '@ngrx/store';

export const selectAllBoards = (state: any) => state.boards;
export const selectBoard = (state: any) => state.board;

export const selectUI = createSelector(selectBoard, (state) => {
  return state.uiPreferences;
});
