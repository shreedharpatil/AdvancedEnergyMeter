import { ActionReducerMap } from '@ngrx/store';
import { reduce } from 'rxjs/operators';
import { PortfolioReducer } from './aem/portfolio/portfolio/portfolio.reducer';
import { AppRoot } from './aem/shared/models';
import { User } from './aem/shared/user/user';
import { UserReducer } from './aem/shared/user/user.reducer';


export interface AppRootState {
    portfolio: AppRoot;
    user: User;
}

export const reducers: ActionReducerMap<AppRootState, any> = {
    portfolio: PortfolioReducer,
    user: UserReducer,
};
