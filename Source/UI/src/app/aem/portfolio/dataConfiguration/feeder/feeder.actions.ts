import { Action } from '@ngrx/store';


export class ResetFeederFormAction implements Action {
    static readonly TYPE = 'feeder/RESET_FEEDER_FORM';
    type = ResetFeederFormAction.TYPE;
}

export class CreateFeederAction implements Action {
    static readonly TYPE = 'feeder/CREATE_FEEDER';
    type = CreateFeederAction.TYPE;
}

export type FeederAction = CreateFeederAction
                           | ResetFeederFormAction
                           ;
