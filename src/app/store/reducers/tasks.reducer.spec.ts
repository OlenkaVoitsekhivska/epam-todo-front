import * as commentActions from '../actions/comment.actions';
import * as fromReducer from './tasks.reducer';
import * as tasksActions from '../actions/tasks.action';
import { StatusE } from 'src/app/models/task.model';

const singleTask = {
  id: '123',
  name: 'task',
  boardId: '123',
  userComments: [],
  image: '',
  status: StatusE.TODO,
  createdAt: new Date('October 31, 2022 03:24:00'),
};

describe('TasksReducer', () => {
  let { initialState } = fromReducer;

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.TasksReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('get tasks action', () => {
    it('should retrieve tasks and update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const newState = Object.assign({}, singleTask);
      const action = tasksActions.getTasksSuccess({ tasks: [newState] });
      const state = fromReducer.TasksReducer(initialState, action);
      expect(state).toEqual([newState]);
      expect(state).not.toEqual(initialState);
    });

    it('should add new task and update the state in an immutable way', () => {
      const prevState = [Object.assign({}, singleTask)];
      const addedTask = { ...prevState[0], id: '456', name: 'task2' };
      const action = tasksActions.addTaskSuccess({ task: addedTask });
      const state = fromReducer.TasksReducer(prevState, action);
      expect(state).toEqual([...prevState, addedTask]);
      expect(state).not.toEqual(prevState);
    });

    it('should delete task and update the state in an immutable way', () => {
      const prevState = [Object.assign({}, singleTask)];
      const id = '123';
      const action = tasksActions.deleteTask({ id });
      const state = fromReducer.TasksReducer(prevState, action);
      expect(state).toEqual(initialState);
      expect(state).not.toEqual(prevState);
    });

    it('should update task and update the state in an immutable way', () => {
      const prevState = Object.assign({}, singleTask);
      const update = { name: 'updatedName' };
      const action = tasksActions.updateTask({
        task: { ...prevState, ...update },
      });
      const state = fromReducer.TasksReducer([prevState], action);
      const updatedState = Object.assign({}, singleTask, update);
      expect(state).toEqual([updatedState]);
      expect(state).not.toEqual([prevState]);
    });

    it('should add comment and update the state in an immutable way', () => {
      const prevState = Object.assign({}, singleTask);
      const comment = {
        id: '123',
        name: 'comment',
        createdAt: new Date('November 03, 2022 03:24:00'),
        taskId: '123',
      };
      const action = commentActions.addCommentSuccess({
        comment,
      });
      const state = fromReducer.TasksReducer([prevState], action);
      expect(state).not.toEqual([prevState]);
    });

    it('should delete comment and update the state in an immutable way', () => {
      const prevState = {
        id: '123',
        name: 'task',
        boardId: '123',
        userComments: [
          {
            id: '123',
            name: 'comment',
            createdAt: new Date('November 03, 2022 03:24:00'),
            taskId: '123',
          },
        ],
        image: '',
        status: StatusE.TODO,
        createdAt: new Date('October 31, 2022 03:24:00'),
      };
      const id = '123';
      const action = commentActions.deleteCommentSuccess({
        id,
      });
      const state = fromReducer.TasksReducer(initialState, action);
      expect(state).not.toEqual([prevState]);
    });
  });
});
