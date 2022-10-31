import { createReducer, on } from '@ngrx/store';
import * as CommentsActions from '../actions/comment.actions';

export const initialState: any[] = [];

export const CommentsReducer = createReducer(
  initialState,
  on(CommentsActions.AddCommentSuccess, (state, { comment }) => [
    ...state,
    comment,
  ]),
  on(CommentsActions.GetCommentsSuccess, (state, { comments }) => {
    return [...state, ...comments];
  })
);
