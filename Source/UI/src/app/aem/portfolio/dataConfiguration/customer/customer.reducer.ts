import { LoadCustomersSucessAction, ResetRegisterCustomerFormAction, CustomerAction } from './customer.actions';
import { CustomerFormValue, CustomerState, INITIAL_CUSTOMER_STATE } from './customer.state';
import { updateGroup, validate, setValue, formGroupReducer } from 'ngrx-forms';
import { required, greaterThan, pattern } from 'ngrx-forms/validation';

const updateFormGroup = updateGroup<CustomerFormValue>({
    districtId: validate([required, greaterThan(0)]),
    talukaId: validate([required, greaterThan(0)]),
    villageId: validate([required, greaterThan(0)]),
    stationId: validate([required, greaterThan(0)]),
    sectionId: validate([required, greaterThan(0)]),
    feederId: validate([required, greaterThan(0)]),
    transformerId: validate([required, greaterThan(0)]),
    loadTypeId: validate([required, greaterThan(0)]),
    firstName: validate<string>(required),
    lastName: validate<string>(required),
    rrNumber: validate<string>(required),
    mobileNumber: validate([required, pattern(/^[0-9]{10}$/)]),
});

const resetCustomerForm = updateGroup<CustomerFormValue>({
    districtId: setValue(0),
    talukaId: setValue(0),
    villageId: setValue(0),
    stationId: setValue(0),
    sectionId: setValue(0),
    feederId: setValue(0),
    transformerId: setValue(0),
    loadTypeId: setValue(0),
    firstName: setValue(''),
    lastName: setValue(''),
    rrNumber: setValue(''),
    mobileNumber: setValue(''),
});

export function CustomerReducer(state: CustomerState = INITIAL_CUSTOMER_STATE, action: CustomerAction): CustomerState {
    const formState = updateFormGroup(formGroupReducer(state.formState, action));
    if (state.formState !== formState) {
        state = { ...state, formState };
    }

    switch (action.type) {
    case  LoadCustomersSucessAction.TYPE:
    return {
            ...state,
            customers: action.payload
        };
    case ResetRegisterCustomerFormAction.TYPE:
        return {
            ...state,
            formState: resetCustomerForm(state.formState),
        };
    default:
            return state;
    }
}