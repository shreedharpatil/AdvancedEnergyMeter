import { createFormGroupState, FormGroupState } from 'ngrx-forms';

export interface SectionState {
    formState: FormGroupState<SectionFormValue>;
}

export interface SectionFormValue {
    districtId: number;
    talukaId: number;
    villageId: number;
    stationId: number;
    sectionName: string;
}

export const INITIAL_SECTION_STATE: SectionState = {
    formState: createFormGroupState<SectionFormValue>('SectionFormGroupState', {
        districtId: 0,
        talukaId: 0,
        villageId: 0,
        stationId: 0,
        sectionName: '',
    })
};
