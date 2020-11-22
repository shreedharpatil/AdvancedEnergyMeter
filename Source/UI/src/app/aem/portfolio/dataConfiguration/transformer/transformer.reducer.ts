import { updateGroup, validate, setValue, formGroupReducer } from 'ngrx-forms';
import { required, greaterThan } from 'ngrx-forms/validation';
import { ResetTransformerFormAction, TransformerAction } from './transformer.actions';
import { TransformerFormValue, TransformerState, INITIAL_TRANSFORMER_STATE } from './transformer.state';


const updateFormGroup = updateGroup<TransformerFormValue>({
    districtId: validate([required, greaterThan(0)]),
    talukaId: validate([required, greaterThan(0)]),
    villageId: validate([required, greaterThan(0)]),
    stationId: validate([required, greaterThan(0)]),
    sectionId: validate([required, greaterThan(0)]),
    feederId: validate([required, greaterThan(0)]),
    transformerName: validate<string>(required),
});

const resetTransformerForm = updateGroup<TransformerFormValue>({
    districtId: setValue(0),
    talukaId: setValue(0),
    villageId: setValue(0),
    stationId: setValue(0),
    sectionId: setValue(0),
    feederId: setValue(0),
    transformerName: setValue(''),
});

export function TransformerReducer(state: TransformerState = INITIAL_TRANSFORMER_STATE, action: TransformerAction): TransformerState {

    const newFormState = updateFormGroup(formGroupReducer(state.formState, action));
    if (state.formState !== newFormState) {
        state = {
            ...state,
            formState: newFormState
        };
    }

    switch (action.type) {
        case ResetTransformerFormAction.TYPE:
            return {
                ...state,
                formState: resetTransformerForm(state.formState),
            };
        default:
            return state;
    }
}
