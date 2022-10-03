import { createReducer, on } from "@ngrx/store";

import {
  modalOpen,
  modalClose,
  editBoardOpen,
  editBoardClose,
  addTaskOpen,
  addTaskClose,
  editTaskOpen,
  editTaskClose,
  signupModalOpen,
  signupModalClose,
  loginModalOpen,
  loginModalClose,
} from "./modal.action";

interface Todo {
  userid: string;
  id: string;
  title: string;
  completed: boolean;
}

export const addBoardState: boolean = false;

export const ModalReducer = createReducer(
  addBoardState,
  on(modalOpen, modalClose, (state) => (state = !state))
);

export const editBoardState: boolean = false;

export const EditBoardReducer = createReducer(
  editBoardState,
  on(editBoardOpen, editBoardClose, (state) => (state = !state))
);

export const addTaskState: boolean = false;

export const AddTaskReducer = createReducer(
  addTaskState,
  on(addTaskOpen, addTaskClose, (state) => (state = !state))
);

export const signupState: boolean = false;
export const SignupReducer = createReducer(
  signupState,
  on(signupModalOpen, signupModalClose, (state) => (state = !state))
);

export const loginState: boolean = false;
export const LoginReducer = createReducer(
  loginState,
  on(loginModalOpen, loginModalClose, (state) => (state = !state))
);

export const editTaskState: boolean = false;
export const EditTaskReducer = createReducer(
  editTaskState,
  on(editTaskOpen, editTaskClose, (state) => (state = !state))
);
