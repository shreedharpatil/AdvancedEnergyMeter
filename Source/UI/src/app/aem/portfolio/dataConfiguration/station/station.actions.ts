import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';


export class ResetStationFormAction implements Action {
    static readonly TYPE = 'station/RESET_STATION_FORM';
    type = ResetStationFormAction.TYPE;
}

export class CreateStationAction implements Action {
    static readonly TYPE = 'station/CREATE_STATION';
    type = CreateStationAction.TYPE;
}

export type StationAction = CreateStationAction
                           | ResetStationFormAction;