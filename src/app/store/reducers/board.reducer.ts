import * as BoardActions from '../actions/board.action';
import { createReducer, on } from '@ngrx/store';

import { Board } from '../../models/board.model';

export const initialState: Board = {
  id: '',
  createdAt: null,
  name: null,
  userId: '',
  description: '',
  tasks: [],
  uiPreferences: {
    col1: '',
    col2: '',
    col3: '',
  },
};

export const BoardReducer = createReducer(
  initialState,
  on(BoardActions.getBoardByIdSuccess, (_, { board }) => board),
  on(BoardActions.updateColor, (state, { id, color }) => {
    return {
      ...state,
      uiPreferences: {
        ...state.uiPreferences,
        ...color,
      },
    };
  }),
  on(BoardActions.clearState, (state) => initialState)
);
