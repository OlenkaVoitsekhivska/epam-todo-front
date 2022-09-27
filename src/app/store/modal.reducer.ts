
import { createReducer, on } from '@ngrx/store';

import {
modalOpen, modalClose
} from './modal.action';

interface Todo {
  userid: string;
  id: string;
  title: string;
  completed: boolean;
}

export const initialState: boolean=false;

export const ModalReducer = createReducer(
  initialState,
  on(modalOpen, modalClose, (state) => state=!state),
);