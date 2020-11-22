import { updateGroup, setValue, validate, formGroupReducer } from 'ngrx-forms';
import { required, pattern, greaterThan } from 'ngrx-forms/validation';
import { VillageAction, ResetVillageFormAction } from './village.actions';
import { VillageFormState, VillageState, InitialVillageState } from './village.state';

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

export function VillageReducer(state: VillageState = InitialVillageState, action: VillageAction) {
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
        default: {
          return state;
        }
      }
}