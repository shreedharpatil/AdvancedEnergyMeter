import { Action } from '@ngrx/store';
import { Customer } from 'src/app/aem/shared/models';

export class LoadCustomersAction implements Action {
    static readonly TYPE = 'LOAD_ALL_CUSTOMERS';
    type = LoadCustomersAction.TYPE;
    payload: any = null;
    constructor() { }
}

export class LoadCustomersSucessAction implements Action {
    static readonly TYPE = 'customer/LOAD_ALL_CUSTOMERS_SUCCESS';
    type = LoadCustomersSucessAction.TYPE;
    constructor(public payload: Customer[]) { }
}

export class AddCustomerAction implements Action {
    static readonly TYPE = 'customer/ADD_CUSTOMER';
    type = AddCustomerAction.TYPE;
    readonly payload = undefined;
}

export class ResetRegisterCustomerFormAction implements Action {
    static readonly TYPE = 'customer/RESET_CUSTOMER_FORM';
    type = ResetRegisterCustomerFormAction.TYPE;
    public payload = undefined;
}

export type CustomerAction = AddCustomerAction
    | LoadCustomersAction
    | LoadCustomersSucessAction
    | ResetRegisterCustomerFormAction;
