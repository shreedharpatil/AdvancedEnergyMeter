import { Action } from '@ngrx/store';

export class HandleApiErrorAction implements Action {
    static readonly TYPE = 'HANDLE_API_ERROR';
    type = HandleApiErrorAction.TYPE;
    payload: {
        title: string,
        error: any
    }

    constructor(title: string, error: any) {
        this.payload = { title, error }
     }
}

export type HttpAction = HandleApiErrorAction;