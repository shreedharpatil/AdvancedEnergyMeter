import { Action } from '@ngrx/store';
import { District, LoadType, Taluka, SaveTaluka, SaveVillage, SaveStation } from '../../shared/models';
import { PortfolioActionType } from './portfolio-action-type';

export class SaveDistrictsAction implements Action {
    type = PortfolioActionType.SaveDistrict;
    constructor(public payload: District[]) {}
}

export class SaveLoadTypesAction implements Action {
    type = PortfolioActionType.SaveLoadTypes;
    constructor(public payload: LoadType[]) {}
}

export class SaveTaulkasAction implements Action {
    type = PortfolioActionType.SaveTalukas;
    constructor(public payload: SaveTaluka) {}
}

export class SaveVillagesAction implements Action {
    type = PortfolioActionType.SaveVillages;
    constructor(public payload: SaveVillage) {}
}

export class SaveStationsAction implements Action {
    type = PortfolioActionType.SaveStations;
    constructor(public payload: SaveStation) {}
}
export type PortfolioAction = SaveTaulkasAction | SaveVillagesAction | SaveDistrictsAction | SaveLoadTypesAction | SaveStationsAction;
