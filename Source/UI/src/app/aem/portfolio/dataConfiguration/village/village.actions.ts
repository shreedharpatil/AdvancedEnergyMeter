import { Action } from '@ngrx/store';
import { Taluka } from 'src/app/aem/shared/models';


export class ResetVillageFormAction implements Action {
    static readonly TYPE = 'village/RESET_FORM';
    type = ResetVillageFormAction.TYPE;
}

export class CreateVillageAction implements Action {
    static readonly TYPE = 'CREATE_VILLAGE';
    type = CreateVillageAction.TYPE;
    public payload = undefined;
}

export class LoadTalukasByDistrictAction implements Action {
    static readonly TYPE = 'LOAD_TALUKAS_BY_DISTRICT_ID';
    type = LoadTalukasByDistrictAction.TYPE;
    public districtId: number;
    constructor(districtId) {
        this.districtId = parseInt(districtId.toString(), 10);
    }
}

export class LoadVillagesByTalukaAction implements Action {
    static readonly TYPE = 'LOAD_VILLAGES_BY_TALUKA_ID';
    type = LoadVillagesByTalukaAction.TYPE;
    public talukaId: number;
    constructor(talukaId) {
        this.talukaId = parseInt(talukaId.toString(), 10);
    }
}

export class SaveFilteredTalukasAction implements Action {
    static readonly TYPE = 'SAVE_VILLAGES_BY_TALUKA_ID1';
    type = SaveFilteredTalukasAction.TYPE;
    constructor(public talukas: Taluka[]) {
    }
}

export type VillageAction = ResetVillageFormAction
                            | CreateVillageAction
                            | LoadTalukasByDistrictAction
                            | LoadVillagesByTalukaAction
                            | SaveFilteredTalukasAction;
