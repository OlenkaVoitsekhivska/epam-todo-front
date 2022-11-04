import { createAction, props } from '@ngrx/store';
import { Comment } from 'src/app/models/comment';

export const addComment = createAction(
  '[Comment] Add comment',
  props<{ taskId: string; comment: any }>()
);

export const addCommentSuccess = createAction(
  '[Comment] Add comment success',
  props<{ comment: Comment }>()
);

export const deleteComment = createAction(
  '[Comment] Delete comment',
  props<{ id: string }>()
);

export const deleteCommentSuccess = createAction(
  '[Comment] Delete comment success',
  props<{ id: string }>()
);
