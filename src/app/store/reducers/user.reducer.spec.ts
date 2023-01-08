import * as userActions from '../actions/user.action';
import * as fromReducer from './user.reducer';

const user = {
  id: '123',
  token: '123',
  email: 'abc@gmai.com',
};

describe('User reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.CurrentUserReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('get board by id action', () => {
    it('should login user and update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const newState = Object.assign({}, user);
      const action = userActions.loginSuccess({ user: newState });
      const state = fromReducer.CurrentUserReducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });

  it('should logout and update the state in an immutable way', () => {
    const { initialState } = fromReducer;
    const newState = Object.assign({}, user);
    const action = userActions.logout();
    const state = fromReducer.CurrentUserReducer(newState, action);
    expect(state).toEqual(initialState);
    expect(state).not.toBe(newState);
  });
});
