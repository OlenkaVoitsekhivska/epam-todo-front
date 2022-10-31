import { createReducer, on } from '@ngrx/store';

import { Task } from 'src/app/models/task.model';
import * as TaskActions from '../actions/tasks.action';
import * as CommentsActions from '../actions/comment.actions';

export const initialState: any = [];

export const TasksReducer = createReducer(
  initialState,
  on(TaskActions.GetTasksSuccess, (state, { tasks }) => tasks),
  on(TaskActions.AddTaskSuccess, (state, { task }) => [...state, task]),
  on(TaskActions.DeleteTask, (state, { id }) =>
    state.filter((task: Task) => task.id !== id)
  ),
  on(TaskActions.GetTasks, TaskActions.DeleteTaskSuccess, (state) => state),
  on(TaskActions.UpdateTask, (state, { task }) => {
    const updatedState = [...state].map((todo: Task) =>
      todo.id === task.id ? task : todo
    );
    return updatedState;
  }),
  on(CommentsActions.AddCommentSuccess, (state, { comment }) => {
    const newState = [...state].map((task: Task) => {
      if (comment.taskId === task.id) {
        return { ...task, userComments: [...task.userComments, comment] };
      } else {
        return task;
      }
    });

    return newState;
  }),
  on(CommentsActions.DeleteComment, (state, { id }) => {
    const newState = [...state].map((task: Task) => {
      const updatedComments = [...task.userComments].filter(
        (comment: any) => comment.id !== id
      );
      return { ...task, userComments: updatedComments };
    });
    return newState;
  })
);
