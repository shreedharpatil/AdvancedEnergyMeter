import { Action } from '@ngrx/store';


export class ResetFeederFormAction implements Action {
    static readonly TYPE = 'feeder/RESET_FEEDER_FORM';
    type = ResetFeederFormAction.TYPE;
}

export class CreateFeederAction implements Action {
    static readonly TYPE = 'feeder/CREATE_FEEDER';
    type = CreateFeederAction.TYPE;
}

export class LoadFeedersBySectionAction implements Action {
    static readonly TYPE = 'LOAD_FEEDERS_BY_SECTION_ID';
    type = LoadFeedersBySectionAction.TYPE;
    public sectionId: number;
    constructor(sectionId) {
        this.sectionId = parseInt(sectionId.toString(), 10);
    }
}

export type FeederAction = CreateFeederAction
                           | ResetFeederFormAction
                           | LoadFeedersBySectionAction
                           ;
