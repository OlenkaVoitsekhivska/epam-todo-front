import * as boardsActions from '../actions/boards.action';
import * as fromReducer from './boards.reducer';

import { Board } from 'src/app/models/board.model';

const singleBoardState: Board = {
  id: '123',
  name: 'board',
  description: 'baord description',
  tasks: [],
  createdAt: new Date('October 31, 2022 03:24:00'),
  userId: '123',
  uiPreferences: {
    col1: '',
    col2: '',
    col3: '',
  },
};

describe('BoardsReducer', () => {
  let { initialState } = fromReducer;

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.BoardsReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('get boards action', () => {
    beforeEach(() => {
      initialState = [];
    });

    it('should retrieve boards and update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const newState = Object.assign({}, singleBoardState);
      const action = boardsActions.getBoardsSuccess({ boards: [newState] });
      const state = fromReducer.BoardsReducer(initialState, action);

      expect(state).toEqual([newState]);
      expect(state).not.toEqual(initialState);
    });

    it('should add new board and update the state in an immutable way', () => {
      const prevState = [Object.assign({}, singleBoardState)];
      const addedBoard = { ...prevState[0], id: '456', name: 'board2' };
      const action = boardsActions.addBoardSuccess({ board: addedBoard });
      const state = fromReducer.BoardsReducer(prevState, action);
      expect(state).toEqual([...prevState, addedBoard]);
      expect(state).not.toEqual(prevState);
    });

    it('should delete board and update the state in an immutable way', () => {
      const prevState = [Object.assign({}, singleBoardState)];
      const id = '123';
      const action = boardsActions.deleteBoard({ id });
      const state = fromReducer.BoardsReducer(prevState, action);
      expect(state).toEqual([]);
      expect(state).not.toEqual(prevState);
    });

    it('should update board and update the state in an immutable way', () => {
      const id = '123';
      const update = { name: 'updatedName' };
      const action = boardsActions.updateBoardSuccess({ id, board: update });
      const prevState = Object.assign({}, singleBoardState);
      const state = fromReducer.BoardsReducer([prevState], action);
      expect(state).not.toEqual([prevState]);
    });
  });
});
