import { createAction, props } from "@ngrx/store";
import { TaskI } from "../models/task.model";
import { AddTaskI } from "../models/addTask.model";

export const GetTasks = createAction(
  "[Task] Get tasks",
  props<{ id: string }>()
);

export const GetTasksSuccess = createAction(
  "[Task] Get tasks success",
  props<{ tasks: TaskI[] }>()
);

export const AddTask = createAction(
  "[Task] Add task",
  props<{ task: AddTaskI; boardId: string }>()
);

export const AddTaskSuccess = createAction(
  "[Task] Add task success",
  props<{ task: TaskI }>()
);

export const DeleteTask = createAction(
  "[Task] Delete task",
  props<{ id: string }>()
);

export const DeleteTaskSuccess = createAction(
  "[Task] Delete task success",
  props<{ id: string }>()
);

export const UpdateTask = createAction(
  "[Task] Update task",
  props<{ id: string; task: TaskI }>()
);

export const UpdateTaskSuccess = createAction("[Task] Update task success");
