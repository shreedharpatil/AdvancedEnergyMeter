import { FormGroupState, createFormGroupState } from 'ngrx-forms';
import { Taluka } from 'src/app/aem/shared/models';

export interface VillageState {
    talukas: Taluka[];
    formState: FormGroupState<VillageFormState>;
}

export interface VillageFormState {
    districtId: number;
    talukaId: number;
    villageName: string;
}

const InitialVillageForm = createFormGroupState<VillageFormState>('VillageFormGroupState', {
    districtId: 0,
    talukaId: 0,
    villageName: '',
});

export const INITIAL_VILLAGE_STATE: VillageState = {
    talukas: [],
    formState: InitialVillageForm,
};
