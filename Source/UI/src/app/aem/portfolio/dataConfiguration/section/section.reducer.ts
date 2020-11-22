import { updateGroup, validate, setValue, formGroupReducer } from 'ngrx-forms';
import { required, greaterThan } from 'ngrx-forms/validation';
import { SectionAction, ResetSectionFormAction } from './section.actions';
import { SectionFormValue, SectionState, INITIAL_SECTION_STATE } from './section.state';


const updateFormGroup = updateGroup<SectionFormValue>({
    districtId: validate([required, greaterThan(0)]),
    talukaId: validate([required, greaterThan(0)]),
    villageId: validate([required, greaterThan(0)]),
    stationId: validate([required, greaterThan(0)]),
    sectionName: validate<string>(required),
});

const resetSectionForm = updateGroup<SectionFormValue>({
    districtId: setValue(0),
    talukaId: setValue(0),
    villageId: setValue(0),
    stationId: setValue(0),
    sectionName: setValue(''),
});

export function SectionReducer(state: SectionState = INITIAL_SECTION_STATE, action: SectionAction): SectionState {

    const newFormState = updateFormGroup(formGroupReducer(state.formState, action));
    if (state.formState !== newFormState) {
        state = {
            ...state,
            formState: newFormState
        };
    }

    switch (action.type) {
        case ResetSectionFormAction.TYPE:
            return {
                ...state,
                formState: resetSectionForm(state.formState),
            };
        default:
            return state;
    }
}
