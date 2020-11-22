import { createFormGroupState, FormGroupState } from 'ngrx-forms';

export interface StationState {
    formState: FormGroupState<StationFormValue>;
}

export interface StationFormValue {
    districtId: number;
    talukaId: number;
    villageId: number;
    stationName: string;
}

export const INITIAL_STATION_STATE: StationState = {
    formState: createFormGroupState<StationFormValue>('StationFormGroupState', {
        districtId: 0,
        talukaId: 0,
        villageId: 0,
        stationName: '',
    })
}
