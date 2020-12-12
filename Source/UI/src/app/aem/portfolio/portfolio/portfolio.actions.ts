import { Action } from '@ngrx/store';
import { District,
         LoadType,
         SaveTaluka,
         SaveVillage,
         SaveStation,
         SaveSection,
         SaveFeeder,
         SaveTransformer } from '../../shared/models';

export class SaveDistrictsAction implements Action {
    static readonly TYPE = 'SAVE_DISTRICT';
    readonly type = SaveDistrictsAction.TYPE;
    constructor(public payload: District[]) {}
}

export class SaveLoadTypesAction implements Action {
    static readonly TYPE = 'SAVE_LOAD_TYPES';
    readonly type = SaveLoadTypesAction.TYPE;
    constructor(public payload: LoadType[]) {}
}

export class SaveTaulkasAction implements Action {
    static readonly TYPE = 'SAVE_TALUKAS';
    readonly type = SaveTaulkasAction.TYPE;
    constructor(public payload: SaveTaluka) {}
}

export class SaveVillagesAction implements Action {
    static readonly TYPE = 'SAVE_VILLAGES';
    readonly type = SaveVillagesAction.TYPE;
    constructor(public payload: SaveVillage) {}
}

export class SaveStationsAction implements Action {
    static readonly TYPE = 'SAVE_STATIONS';
    readonly type = SaveStationsAction.TYPE;
    constructor(public payload: SaveStation) {}
}

export class SaveSectionsAction implements Action {
    static readonly TYPE = 'SAVE_SECTIONS';
    readonly type = SaveSectionsAction.TYPE;
    constructor(public payload: SaveSection) {}
}

export class SaveFeedersAction implements Action {
    static readonly TYPE = 'SAVE_FEEDERS';
    readonly type = SaveFeedersAction.TYPE;
    constructor(public payload: SaveFeeder) {}
}

export class SaveTransformersAction implements Action {
    static readonly TYPE = 'SAVE_TRANSFORMERS';
    readonly type = SaveTransformersAction.TYPE;
    constructor(public payload: SaveTransformer) {}
}

export type PortfolioAction = SaveTaulkasAction |
                              SaveVillagesAction |
                              SaveDistrictsAction |
                              SaveLoadTypesAction |
                              SaveStationsAction |
                              SaveSectionsAction |
                              SaveFeedersAction |
                              SaveTransformersAction
                             ;
