import { createSelector } from '@ngrx/store';

export const currentUserSelector = (state: any) => state.loggedUser;
