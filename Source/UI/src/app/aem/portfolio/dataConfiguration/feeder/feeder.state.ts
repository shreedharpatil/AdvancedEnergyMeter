import { createFormGroupState, FormGroupState } from 'ngrx-forms';

export interface FeederState {
    formState: FormGroupState<FeederFormValue>;
}

export interface FeederFormValue {
    districtId: number;
    talukaId: number;
    villageId: number;
    stationId: number;
    sectionId: number;
    feederName: string;
}

export const INITIAL_FEEDER_STATE: FeederState = {
    formState: createFormGroupState<FeederFormValue>('FeederFormGroupState', {
        districtId: 0,
        talukaId: 0,
        villageId: 0,
        stationId: 0,
        sectionId: 0,
        feederName: '',
    })
};
