import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { withLatestFrom, filter, map, flatMap, switchMap } from 'rxjs/operators';
import { post } from 'src/app/aem/shared/http/http-helper';
import { Customer } from 'src/app/aem/shared/models';
import { NotificationService } from 'src/app/aem/shared/notification.service';
import { HideLoaderAction } from 'src/app/aem/shared/spinner/spinner-actions';
import { environment } from 'src/environments/environment';
import { DataConfigurationRootState } from '../data.configuration.reducer';
import { AddCustomerAction, LoadCustomersAction, LoadCustomersSucessAction, ResetRegisterCustomerFormAction } from './customer.actions';


@Injectable()
export class CustomerEffects {

    constructor(private store: Store<DataConfigurationRootState>,
                private http: HttpClient,
                private actions$: Actions,
                private notification: NotificationService) {}

    @Effect()
    loadCustomers$: Observable<Action> = this.actions$.pipe(
        ofType<LoadCustomersAction>(LoadCustomersAction.TYPE),
        flatMap(() => {
            return this.http.get<Customer[]>(environment.apiBaseUrl + 'contextapi/customer')
                .pipe(
                    switchMap((p) => [new LoadCustomersSucessAction(p)])
                );
        })
    );

    @Effect()
    addCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<AddCustomerAction>(AddCustomerAction.TYPE),
        withLatestFrom(this.store.select(p => p.dataConfiguration.customer.formState)),
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
