import { Action } from '@ngrx/store';


export class ResetVillageFormAction implements Action {
    static readonly TYPE = 'village/RESET_FORM';
    type = ResetVillageFormAction.TYPE;
}

export class CreateVillageAction implements Action {
    static readonly TYPE = 'CREATE_VILLAGE';
    type = CreateVillageAction.TYPE;
    public payload = undefined;
}

export type VillageAction = ResetVillageFormAction
                            | CreateVillageAction;
