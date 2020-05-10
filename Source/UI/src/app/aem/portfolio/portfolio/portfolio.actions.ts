import { Action } from '@ngrx/store';
import { District,
         LoadType,
         SaveTaluka,
         SaveVillage,
         SaveStation,
         SaveSection,
         SaveFeeder,
         SaveTransformer } from '../../shared/models';
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

export class SaveSectionsAction implements Action {
    type = PortfolioActionType.SaveSections;
    constructor(public payload: SaveSection) {}
}

export class SaveFeedersAction implements Action {
    type = PortfolioActionType.SaveFeeders;
    constructor(public payload: SaveFeeder) {}
}

export class SaveTransformersAction implements Action {
    type = PortfolioActionType.SaveTransformers;
    constructor(public payload: SaveTransformer) {}
}

export class CreateVillageAction implements Action {
    static readonly TYPE = 'CREATE_VILLAGE';
    type = CreateVillageAction.TYPE;
    constructor(public payload: any) {}
}

export class CreateStationAction implements Action {
    static readonly TYPE = 'CREATE_STATION';
    type = CreateStationAction.TYPE;

    constructor(public payload: any) {}
}

export class CreateSectionAction implements Action {
    static readonly TYPE = 'CREATE_SECTION';
    type = CreateSectionAction.TYPE;

    constructor(public payload: any) {}
}

export class CreateFeederAction implements Action {
    static readonly TYPE = 'CREATE_FEEDER';
    type = CreateFeederAction.TYPE;

    constructor(public payload: any) {}
}

export class CreateTransformerAction implements Action {
    static readonly TYPE = 'CREATE_TRANSFORMER';
    type = CreateTransformerAction.TYPE;

    constructor(public payload: any) {}
}
export type PortfolioAction = SaveTaulkasAction |
                              SaveVillagesAction |
                              SaveDistrictsAction |
                              SaveLoadTypesAction |
                              SaveStationsAction |
                              SaveSectionsAction |
                              SaveFeedersAction |
                              SaveTransformersAction |
                              CreateVillageAction |
                              CreateStationAction |
                              CreateSectionAction |
                              CreateFeederAction |
                              CreateTransformerAction ;
