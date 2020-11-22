

import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { Customer } from 'src/app/aem/shared/models';

export interface CustomerState {
    customers: Customer[];
    formState: FormGroupState<CustomerFormValue>;
}

export interface CustomerFormValue {
    rrNumber: string;
    firstName: string;
    lastName: string;
    loadTypeId: number;
    districtId: number;
    talukaId: number;
    villageId: number;
    stationId: number;
    sectionId: number;
    feederId: number;
    transformerId: number;
    mobileNumber: string;
}

export const INITIAL_CUSTOMER_STATE: CustomerState = {
    customers: [],
    formState: createFormGroupState<CustomerFormValue>('CustomerFormGroupState', {
        rrNumber: '',
        firstName: '',
        lastName: '',
        loadTypeId: 0,
        districtId: 0,
        talukaId: 0,
        villageId: 0,
        stationId: 0,
        sectionId: 0,
        feederId: 0,
        transformerId: 0,
        mobileNumber: '',
    })
};
