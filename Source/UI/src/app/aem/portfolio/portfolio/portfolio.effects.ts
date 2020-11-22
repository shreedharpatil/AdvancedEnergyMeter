import { HttpClient } from '@angular/common/http';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { flatMap, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../../shared/notification.service';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Customer } from '../../shared/models';
import { LoadCustomersAction, LoadCustomersSucessAction } from '../dataConfiguration/customer/customer.actions';

@Injectable()
export class PortfolioEffects {
    constructor(private http: HttpClient,
                private actions$: Actions,
                private notification: NotificationService) { }


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
}
