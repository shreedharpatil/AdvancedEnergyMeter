import { Action } from '@ngrx/store';

export class ShowLoaderAction implements Action {
    static readonly TYPE = 'SHOW_LOADER';
    type = ShowLoaderAction.TYPE;
    payload = null;
    constructor() {}
}

export class HideLoaderAction implements Action {
    static readonly TYPE = 'CLOSE_LOADER';
    type = HideLoaderAction.TYPE;
    payload = null;
    constructor() {}
}

export type SpinnerAction =   ShowLoaderAction
                              | HideLoaderAction;