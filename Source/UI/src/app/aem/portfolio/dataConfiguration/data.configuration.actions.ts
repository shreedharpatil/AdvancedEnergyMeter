import { Action } from '@ngrx/store';
// import { District, LoadType } from '../../shared/models';

// export class SaveDistrictsAction implements Action {
//     static readonly TYPE = 'SAVE_DISTRICTS';
//     readonly type = SaveDistrictsAction.TYPE;
//     constructor(public payload: District[]) {}
// }

// export class SaveLoadTypesAction implements Action {
//     static readonly TYPE = 'SAVE_LOAD_TYPES';
//     readonly type = SaveLoadTypesAction.TYPE;
//     constructor(public payload: LoadType[]) {}
// }

export class LoadLoadTypesAction implements Action {
    static readonly TYPE = 'LOAD_LOAD_TYPES';
    readonly type = LoadLoadTypesAction.TYPE;
}

export class LoadDistrictsAction implements Action {
    static readonly TYPE = 'LOAD_DISTRICTS';
    readonly type = LoadDistrictsAction.TYPE;
}

export type DataConfigurationAction =
                            //    SaveDistrictsAction
                            //  | SaveLoadTypesAction
                             | LoadLoadTypesAction
                             | LoadDistrictsAction
                             ;
