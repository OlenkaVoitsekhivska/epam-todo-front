import { createReducer, on } from '@ngrx/store';
import * as BoardActions from './boards.action';
import { tasks } from '../tasks/tasks';
import { BoardI } from '../models/board.model';

export const initialState: string | null = null;

// export const CurrentBoardReducer = createReducer(
//   initialState,
//   on(BoardActions.SetCurrentBoard, (state, { id }) => id),
//   on(BoardActions.GetCurrentBoard, (state) => state)
// );

// import { retrievedBookList } from './books.actions';
// import { Book } from '../book-list/books.model';

// export const initialState: ReadonlyArray<Book> = [];

// export const booksReducer = createReducer(
//   initialState,
//   on(retrievedBookList, (state, { books }) => books)
// );

export const initialBoardsState: BoardI[] = [];

export const BoardsReducer = createReducer(
  initialBoardsState,
  on(BoardActions.AddBoardSuccess, (state, { board }) => [...state, board]),
  on(BoardActions.GetBoards, (state, { id }) =>
    state.filter((board) => board.userId === id)
  ),
  on(BoardActions.UpdateBoard, (state, { id, board }) => {
    let activeBoard = state.find((board) => board.id === id);
    return [...state, { ...activeBoard, ...board }];
  }),
  on(BoardActions.GetBoardsSuccess, (state: any, { boards }: any) => boards),
  on(BoardActions.DeleteBoard, (state, { id }) =>
    state.filter((board) => board.id !== id)
  )
);
