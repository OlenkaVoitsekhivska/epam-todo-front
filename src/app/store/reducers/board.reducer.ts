import { createReducer, on } from '@ngrx/store';
import * as BoardActions from '../actions/board.action';

import { Board } from '../../models/board.model';

export const initialState: string | null = null;

export const initialBoardState: Partial<Board> = {};

export const BoardReducer = createReducer(
  initialBoardState,
  on(BoardActions.getBoardByIdSuccess, (_, { board }) => board),
  on(BoardActions.updateColor, (state, { id, board }) => {
    const obj = {
      ...state,
      uiPreferences: {
        ...state.uiPreferences,
        ...board,
      },
    };
    return obj;
  })
);
