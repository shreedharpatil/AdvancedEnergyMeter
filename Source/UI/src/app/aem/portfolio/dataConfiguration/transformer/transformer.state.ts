import { createFormGroupState, FormGroupState } from 'ngrx-forms';

export interface TransformerState {
    formState: FormGroupState<TransformerFormValue>;
}

export interface TransformerFormValue {
    districtId: number;
    talukaId: number;
    villageId: number;
    stationId: number;
    sectionId: number;
    feederId: number;
    transformerName: string;
}

export const INITIAL_TRANSFORMER_STATE: TransformerState = {
    formState: createFormGroupState<TransformerFormValue>('TransformerFormGroupState', {
        districtId: 0,
        talukaId: 0,
        villageId: 0,
        stationId: 0,
        sectionId: 0,
        feederId: 0,
        transformerName: '',
    })
};
