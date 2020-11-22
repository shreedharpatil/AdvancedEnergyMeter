import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { withLatestFrom, filter, map, flatMap } from 'rxjs/operators';
import { post } from 'src/app/aem/shared/http/http-helper';
import { NotificationService } from 'src/app/aem/shared/notification.service';
import { HideLoaderAction } from 'src/app/aem/shared/spinner/spinner-actions';
import { AddCustomerAction, LoadCustomersAction, ResetRegisterCustomerFormAction } from './customer.actions';
import { CustomerState } from './customer.state';


@Injectable()
export class CustomerEffects {

    constructor(private store: Store<{customer: CustomerState}>,
                private http: HttpClient,
                private actions$: Actions,
                private notification: NotificationService) {}

    @Effect()
    addCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<AddCustomerAction>(AddCustomerAction.TYPE),
        withLatestFrom(this.store.select(p => p.customer.formState)),
        filter(([_, fs]) => fs.isValid),
        map(([, fs]) => fs.value),
        flatMap((customer) => {
            return post(this.http,
                'contextapi/customer',
                customer,
                () => {
                    this.notification.showSuccess('Customer created successfully', 'Register Customer');
                    return [new HideLoaderAction(), new LoadCustomersAction(), new ResetRegisterCustomerFormAction()];
                },
                'Register Customer');
        })
    );
}
