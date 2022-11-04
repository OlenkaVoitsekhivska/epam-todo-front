import { createReducer, on } from '@ngrx/store';
import * as BoardActions from '../actions/boards.action';

import { Board } from '../../models/board.model';

export const initialState: Partial<Board>[] = [];

export const BoardsReducer = createReducer(
  initialState,
  on(BoardActions.addBoardSuccess, (state, { board }) => [...state, board]),
  on(BoardActions.getBoards, (state, { id }) =>
    state.filter((board) => board.userId === id)
  ),
  on(BoardActions.updateBoardSuccess, (state, { id, board }) => {
    const updatedState = state.map((b) => (b.id === id ? board : b));
    return [...updatedState];
  }),
  on(BoardActions.getBoardsSuccess, (state: any, { boards }: any) => boards),
  on(BoardActions.deleteBoard, (state, { id }) =>
    state.filter((board) => board.id !== id)
  )
);
