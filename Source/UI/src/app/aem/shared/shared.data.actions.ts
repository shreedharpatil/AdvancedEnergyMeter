import { Action } from '@ngrx/store';

export class LoadStationsByVillageIdAction implements Action {
    static readonly TYPE = 'LOAD_STATIONS_BY_VILLAGE_ID';
    type = LoadStationsByVillageIdAction.TYPE;

    constructor(public payload: number) {}
}

export class LoadVillagesByTalukaIdAction implements Action {
    static readonly TYPE = 'LOAD_VILLAGES_BY_TALUKA_ID';
    type = LoadVillagesByTalukaIdAction.TYPE;

    constructor(public payload: number) {}
}

export class LoadSectiosByStationIdAction implements Action {
    static readonly TYPE = 'LOAD_SECTIONS_BY_STATION_ID';
    type = LoadSectiosByStationIdAction.TYPE;

    constructor(public payload: number) {}
}

export class LoadFeedersBySectionIdAction implements Action {
    static readonly TYPE = 'LOAD_FEEDERS_BY_SECTION_ID';
    type = LoadFeedersBySectionIdAction.TYPE;

    constructor(public payload: number) {}
}

export class LoadTransformersByFeederIdAction implements Action {
    static readonly TYPE = 'LOAD_TRANSFORMERS_BY_FEEDER_ID';
    type = LoadTransformersByFeederIdAction.TYPE;

    constructor(public payload: number) {}
}

export type SharedDataAction =    LoadStationsByVillageIdAction
                                | LoadVillagesByTalukaIdAction
                                | LoadSectiosByStationIdAction
                                | LoadFeedersBySectionIdAction
                                | LoadTransformersByFeederIdAction
                                ;