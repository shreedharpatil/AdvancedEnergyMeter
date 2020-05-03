import { Action } from '@ngrx/store';
import { UserActionTypes } from './user.action.types';
import { User } from './user';

export class SaveUserDetailsAction implements Action {
    type = UserActionTypes.SaveUserDetails;
    constructor(public payload: User) {}
}

export type UserAction = SaveUserDetailsAction;