import { UserAction } from './user.actions';
import { UserActionTypes } from './user.action.types';
import { User } from './user';
const user: User = new User();

export function UserReducer(state: {}, action: UserAction) {
    switch (action.type) {
        case UserActionTypes.SaveUserDetails:
            return action.payload;
            break;
        default:
            return state;
    }
}