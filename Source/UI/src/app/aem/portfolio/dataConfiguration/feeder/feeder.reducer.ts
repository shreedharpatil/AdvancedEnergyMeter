import { updateGroup, validate, setValue, formGroupReducer } from 'ngrx-forms';
import { required, greaterThan } from 'ngrx-forms/validation';
import { FeederAction, ResetFeederFormAction } from './feeder.actions';
import { FeederFormValue, FeederState, INITIAL_FEEDER_STATE } from './feeder.state';


const updateFormGroup = updateGroup<FeederFormValue>({
    districtId: validate([required, greaterThan(0)]),
    talukaId: validate([required, greaterThan(0)]),
    villageId: validate([required, greaterThan(0)]),
    stationId: validate([required, greaterThan(0)]),
    sectionId: validate([required, greaterThan(0)]),
    feederName: validate<string>(required),
});

const resetFeederForm = updateGroup<FeederFormValue>({
    districtId: setValue(0),
    talukaId: setValue(0),
    villageId: setValue(0),
    stationId: setValue(0),
    sectionId: setValue(0),
    feederName: setValue(''),
});

export function FeederReducer(state: FeederState = INITIAL_FEEDER_STATE, action: FeederAction): FeederState {

    const newFormState = updateFormGroup(formGroupReducer(state.formState, action));
    if (state.formState !== newFormState) {
        state = {
            ...state,
            formState: newFormState
        };
    }

    switch (action.type) {
        case ResetFeederFormAction.TYPE:
            return {
                ...state,
                formState: resetFeederForm(state.formState),
            };
        default:
            return state;
    }
}
