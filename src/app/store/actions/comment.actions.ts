import { createAction, props } from '@ngrx/store';
import { Comment } from 'src/app/models/comment';

export const AddComment = createAction(
  '[Comment] Add comment',
  props<{ taskId: string; comment: any }>()
);

export const AddCommentSuccess = createAction(
  '[Comment] Add comment success',
  props<{ comment: Comment }>()
);

export const DeleteComment = createAction(
  '[Comment] Delete comment',
  props<{ id: string }>()
);

export const DeleteCommentSuccess = createAction(
  '[Comment] Delete comment success',
  props<{ id: string }>()
);

export const GetComments = createAction(
  '[Comment] Get comments',
  props<{ boardId: string }>()
);

export const GetCommentsSuccess = createAction(
  '[Comment] Get comments success',
  props<{ comments: any }>()
);
