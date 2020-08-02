import { PortfolioEffectActions, LoadCustomersSucessAction, ResetRegisterCustomerFormAction } from './customer.actions';
import { Customer } from 'src/app/aem/shared/models';
let initialState: {
    customers: Customer[];
    customer: Customer;
};

initialState = { customers: [], customer: new Customer() };

export function CustomerReducer(state = initialState, action: PortfolioEffectActions) {
    switch (action.type) {
    case  LoadCustomersSucessAction.TYPE:
    return {
            ...state,
            customers: action.payload
        };
    case ResetRegisterCustomerFormAction.TYPE:
        return {
            ...state,
            customer: new Customer()
        };
    default:
            return state;
    }
}