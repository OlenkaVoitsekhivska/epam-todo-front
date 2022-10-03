import { createReducer, on } from "@ngrx/store";
import * as TaskActions from "./tasks.action";
import { tasks } from "../tasks/tasks";
import { GetBoardsSuccess } from "./boards.action";
import { TaskI } from "../models/task.model";

// export const initialState: TaskI[] = [];
export const initialState: any[] = [];

export const TasksReducer = createReducer(
  initialState,
  on(TaskActions.GetTasksSuccess, (state, { tasks }) => tasks),
  on(TaskActions.AddTaskSuccess, TaskActions.AddTask, (state, { task }) => [
    ...state,
    task,
  ]),
  on(TaskActions.DeleteTask, (state, { id }) =>
    state.filter((task) => task.id !== id)
  ),
  on(
    TaskActions.GetTasks,
    TaskActions.DeleteTaskSuccess,
    TaskActions.UpdateTaskSuccess,
    (state) => state
  ),
  on(TaskActions.UpdateTask, (state, { id, task }) => {
    let activeTask = state.find((task) => task.id === id);
    return [...state, { ...activeTask, ...task }];
  })
);
