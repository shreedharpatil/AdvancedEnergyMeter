import { Action } from '@ngrx/store';
import { formGroupReducer, setValue, updateGroup, validate } from 'ngrx-forms';
import { greaterThan, required } from 'ngrx-forms/validation';
import { ResetStationFormAction } from './station.actions';
import { INITIAL_STATION_STATE, StationFormValue, StationState } from './station.state';


const updateFormGroup = updateGroup<StationFormValue>({
    districtId: validate([required, greaterThan(0)]),
    talukaId: validate([required, greaterThan(0)]),
    villageId: validate([required, greaterThan(0)]),
    stationName: validate<string>(required),
});

const resetStationForm = updateGroup<StationFormValue>({
    districtId: setValue(0),
    talukaId: setValue(0),
    villageId: setValue(0),
    stationName: setValue(''),
});

export function StationReducer(state: StationState = INITIAL_STATION_STATE, action: Action): StationState {

    const newFormState = updateFormGroup(formGroupReducer(state.formState, action));
    if (state.formState !== newFormState) {
        state = {
            ...state,
            formState: newFormState
        };
    }

    switch (action.type) {
        case ResetStationFormAction.TYPE:
            return {
                ...state,
                formState: resetStationForm(state.formState),
            };
        default:
            return state;
    }
}