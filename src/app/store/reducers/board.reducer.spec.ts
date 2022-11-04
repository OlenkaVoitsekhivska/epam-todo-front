import * as boardActions from '../actions/board.action';
import * as fromReducer from './board.reducer';

import { Board } from '../../models/board.model';

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

describe('BoardReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.BoardReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('get board by id action', () => {
    it('should retrieve board by id and update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const newState = Object.assign({}, singleBoardState);
      const action = boardActions.getBoardByIdSuccess({ board: newState });
      const state = fromReducer.BoardReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });

    it('should update uiPreferences and update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const newState = Object.assign({}, singleBoardState);
      const id = '123';
      const uiBoard: Board = {
        id: '123',
        name: 'board',
        description: 'baord description',
        tasks: [],
        createdAt: new Date('October 31, 2022 03:24:00'),
        userId: '123',
        uiPreferences: {
          col1: '#F5FFF5',
          col2: '',
          col3: '',
        },
      };

      const newPreference = { col1: '#F5FFF5' };
      const action = boardActions.updateColor({
        id: id,
        board: newPreference,
      });
      const state = fromReducer.BoardReducer(newState, action);
      expect(state).toEqual(uiBoard);
      expect(state).not.toEqual(initialState);
    });
  });
});
