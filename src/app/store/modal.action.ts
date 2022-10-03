import { createAction } from "@ngrx/store";

export const modalOpen = createAction("[Modal] Modal open");

export const modalClose = createAction("[Modal] Modal close");

export const editBoardOpen = createAction("[Board] Modal open");

export const editBoardClose = createAction("[Board] Modal close");

export const addTaskOpen = createAction("[Task] Add modal open");

export const addTaskClose = createAction("[Task] Add modal close");

export const editTaskOpen = createAction("[Task] Edit modal open");

export const editTaskClose = createAction("[Task] Edit modal close");

export const signupModalOpen = createAction("[Signup] Signup modal open");

export const signupModalClose = createAction("[Signup] Signup modal close");

export const loginModalOpen = createAction("[Signup] Signup modal open");

export const loginModalClose = createAction("[Signup] Signup modal close");
