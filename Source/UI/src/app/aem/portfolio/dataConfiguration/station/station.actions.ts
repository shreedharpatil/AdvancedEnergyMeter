import { Action } from '@ngrx/store';


export class ResetStationFormAction implements Action {
    static readonly TYPE = 'station/RESET_STATION_FORM';
    type = ResetStationFormAction.TYPE;
}

export class CreateStationAction implements Action {
    static readonly TYPE = 'station/CREATE_STATION';
    type = CreateStationAction.TYPE;
}

export class LoadStationsByVillageAction implements Action {
    static readonly TYPE = 'LOAD_STATIONS_BY_VILLAGE_ID';
    type = LoadStationsByVillageAction.TYPE;
    public villageId: number;
    constructor(villageId) {
        this.villageId = parseInt(villageId.toString(), 10);
    }
}

export type StationAction = CreateStationAction
                           | ResetStationFormAction
                           | LoadStationsByVillageAction
                           ;
