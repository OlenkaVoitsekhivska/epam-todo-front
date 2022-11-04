import * as CommentsActions from '../actions/comment.actions';
import * as TaskActions from '../actions/tasks.action';
import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/models/task.model';

export const initialState: any = [];

export const TasksReducer = createReducer(
  initialState,
  on(TaskActions.getTasksSuccess, (state, { tasks }) => tasks),
  on(TaskActions.addTaskSuccess, (state, { task }) => [...state, task]),
  on(TaskActions.deleteTask, (state, { id }) =>
    state.filter((task: Task) => task.id !== id)
  ),
  on(TaskActions.updateTask, (state, { task }) => {
    const updatedState = [...state].map((todo: Task) =>
      todo.id === task.id ? task : todo
    );
    return updatedState;
  }),
  on(CommentsActions.addCommentSuccess, (state, { comment }) => {
    const newState = [...state].map((task: Task) => {
      if (comment.taskId === task.id) {
        return { ...task, userComments: [...task.userComments, comment] };
      } else {
        return task;
      }
    });

    return newState;
  }),
  on(CommentsActions.deleteComment, (state, { id }) => {
    const newState = [...state].map((task: Task) => {
      const updatedComments = [...task.userComments].filter(
        (comment: any) => comment.id !== id
      );
      return { ...task, userComments: updatedComments };
    });
    return newState;
  })
);
