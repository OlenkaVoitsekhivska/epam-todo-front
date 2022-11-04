import * as BoardActions from '../actions/board.action';
import { createReducer, on } from '@ngrx/store';

import { Board } from '../../models/board.model';

export const initialState: Partial<Board> = {};

export const BoardReducer = createReducer(
  initialState,
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
