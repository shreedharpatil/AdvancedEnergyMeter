import { updateGroup, setValue, validate, formGroupReducer } from 'ngrx-forms';
import { required, pattern, greaterThan } from 'ngrx-forms/validation';
import { VillageAction, ResetVillageFormAction, SaveFilteredTalukasAction } from './village.actions';
import { VillageFormState, VillageState, INITIAL_VILLAGE_STATE } from './village.state';

const resetVillageForm = updateGroup<VillageFormState>({
    districtId: setValue(0),
    talukaId: setValue(0),
    villageName: setValue(''),
});

const updateFormGroup = updateGroup<VillageFormState>(
    {
        villageName: validate<string>(required),
        districtId: validate<number>([required, greaterThan(0)]),
        talukaId: validate<number>([required, greaterThan(0)])
    }
);

export function VillageReducer(state: VillageState = INITIAL_VILLAGE_STATE, action: VillageAction) {
    const formState = updateFormGroup(formGroupReducer(state.formState, action));
    if (state.formState !== formState) {
        state = {...state, formState};
    }
    switch (action.type) {
        case ResetVillageFormAction.TYPE:
            return {
                ...state,
                formState: resetVillageForm(state.formState)
            };
        case SaveFilteredTalukasAction.TYPE:
            const t = action as SaveFilteredTalukasAction;
            return {
                ...state,
                talukas: t.talukas,
            };
        default: {
          return state;
        }
      }
}