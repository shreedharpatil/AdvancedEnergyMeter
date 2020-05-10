import { Action } from '@ngrx/store';
import { Customer } from 'src/app/aem/shared/models';

export class LoadCustomersAction implements Action {
    static readonly TYPE = 'LOAD_ALL_CUSTOMERS';
    type = LoadCustomersAction.TYPE;
    payload: any = null;
    constructor() { }
}

export class LoadCustomersSucessAction implements Action {
    static readonly TYPE = 'LOAD_ALL_CUSTOMERS_SUCCESS';
    type = LoadCustomersSucessAction.TYPE;

    constructor(public payload: Customer[]) { }
}

export class AddCustomerAction implements Action {
    static readonly TYPE = 'ADD_CUSTOMER';
    type = AddCustomerAction.TYPE;

    readonly payload: {
        customer: Customer;
        callback: any;
    };
    constructor(customer: Customer, callback: any) {
        this.payload = { customer, callback };
    }
}

export class ResetRegisterCustomerFormAction implements Action {
    static readonly TYPE = 'RESET_CUSTOMER_FORM';
    type = ResetRegisterCustomerFormAction.TYPE;
    public payload = null;
    constructor() { }
}

export type PortfolioEffectActions = AddCustomerAction
    | LoadCustomersAction
    | LoadCustomersSucessAction
    | ResetRegisterCustomerFormAction;
