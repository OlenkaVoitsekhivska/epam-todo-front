import { createSelector } from "@ngrx/store";
import { tasks } from "../tasks/tasks";
import { TaskI } from "../models/task.model";

export const showBoardModalSelector = (state: any) => state.addBoardModal;

export const editBoardModalSelector = (state: any) => state.editBoardModal;

export const addTaskModalSelector = (state: any) => state.addTaskModal;

export const editTaskSelector = (state: any) => state.editTaskModal;
