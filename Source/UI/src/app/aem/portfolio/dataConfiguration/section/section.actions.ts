import { Action } from '@ngrx/store';


export class ResetSectionFormAction implements Action {
    static readonly TYPE = 'section/RESET_SECTION_FORM';
    type = ResetSectionFormAction.TYPE;
}

export class CreateSectionAction implements Action {
    static readonly TYPE = 'section/CREATE_SECTION';
    type = CreateSectionAction.TYPE;
}

export class LoadSectionsByStationAction implements Action {
    static readonly TYPE = 'LOAD_SECTIONS_BY_STATION_ID';
    type = LoadSectionsByStationAction.TYPE;
    public stationId: number;
    constructor(stationId) {
        this.stationId = parseInt(stationId.toString(), 10);
    }
}

export type SectionAction = CreateSectionAction
                           | ResetSectionFormAction
                           | LoadSectionsByStationAction
                           ;
