import { UserAction } from './user.actions';
import { UserActionTypes } from './user.action.types';
import { User } from './user';
const user: User = new User();

export function UserReducer(state: User = user, action: UserAction) {
    switch (action.type) {
        case UserActionTypes.SaveUserDetails:
            return action.payload;
        default:
            return state;
    }
}
