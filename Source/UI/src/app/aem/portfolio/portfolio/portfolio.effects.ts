import { HttpClient } from '@angular/common/http';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, flatMap, switchMap, tap, switchMapTo, mergeMap, withLatestFrom } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../../shared/notification.service';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Customer, SaveVillage, SaveStation, SaveSection, SaveFeeder, SaveTransformer } from '../../shared/models';
import { LoadCustomersAction,
        AddCustomerAction,
        LoadCustomersSucessAction,
        ResetRegisterCustomerFormAction } from './customer/customer.actions';
import { CreateVillageAction,
         CreateStationAction,
         CreateSectionAction,
         CreateFeederAction,
         CreateTransformerAction } from './portfolio.actions';
import { LoadVillagesByTalukaIdAction,
         LoadStationsByVillageIdAction,
         LoadSectiosByStationIdAction,
         LoadFeedersBySectionIdAction,
         LoadTransformersByFeederIdAction } from '../../shared/shared.data.actions';

@Injectable()
export class PortfolioEffects {
    constructor(private http: HttpClient,
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
        map(p => p.payload),
        flatMap((payload) => {
            return this.http.post(environment.apiBaseUrl + 'contextapi/customer', payload.customer)
            .pipe(
                map(p => {
                    this.notification.showSuccess('Customer created successfully', 'Register Customer');
                    // payload.callback();
                },
                error => this.notification.showSuccess(error.error, 'Register Customer')),
                switchMap(p => [new ResetRegisterCustomerFormAction(), new LoadCustomersAction()])
                );
            })
    );

    @Effect()
    addVillage$: Observable<Action> = this.actions$.pipe(
        ofType<CreateVillageAction>(CreateVillageAction.TYPE),
        map(p => p.payload),
        flatMap((village) => {
            return this.http.post(environment.apiBaseUrl + 'contextapi/village', village)
            .pipe(map(
                p => {
                    this.notification.showSuccess('Village created successfully', 'Create Village');
                    return new LoadVillagesByTalukaIdAction(village.talukaId);
                    // this.clearForm();
                    },
                    error => {
                                this.notification.showError(error.error, 'Create Village');
                                flatMap(() => []);
                    }
            ));
        })
    );

    @Effect()
    addStation$: Observable<Action> = this.actions$.pipe(
        ofType<CreateStationAction>(CreateStationAction.TYPE),
        map(p => p.payload),
        flatMap((station) => {
            return this.http.post(environment.apiBaseUrl + 'contextapi/station', station)
            .pipe(
                map(p => {
                    this.notification.showSuccess('Station created successfully', 'Create Station');
                    return new LoadStationsByVillageIdAction(station.villageId);
                    // this.clearForm();
                },
                error => this.notification.showError(error.error, 'Create Station'))
            );
        })
    );

    @Effect()
    addSection$: Observable<Action> = this.actions$.pipe(
        ofType<CreateSectionAction>(CreateSectionAction.TYPE),
        map(p => p.payload),
        flatMap((section) => {
            return this.http.post(environment.apiBaseUrl + 'contextapi/section', section)
            .pipe(
                map(p => {
                    this.notification.showSuccess('Section created successfully', 'Create Section');
                    return new LoadSectiosByStationIdAction(section.stationId);
                },
                error => this.notification.showError(error.error, 'Create Feeder')
                )
            );
        })
    );

    @Effect()
    addFeeder$: Observable<Action> = this.actions$.pipe(
        ofType<CreateFeederAction>(CreateFeederAction.TYPE),
        map(p => p.payload),
        flatMap((feeder) => {
            return this.http.post(environment.apiBaseUrl + 'contextapi/feeder', feeder)
            .pipe(
                map(p => {
                    this.notification.showSuccess('Feeder created successfully', 'Create Feeder');
                    return new LoadFeedersBySectionIdAction(feeder.sectionId);
                },
                error => this.notification.showError(error.error, 'Create Feeder')
                )
            );
        })
    );

    @Effect()
    addTransformer$: Observable<Action> = this.actions$.pipe(
        ofType<CreateTransformerAction>(CreateTransformerAction.TYPE),
        map(p => p.payload),
        flatMap((transformer) => {
            return this.http.post(environment.apiBaseUrl + 'contextapi/transformer', transformer)
            .pipe(
                map(p => {
                    this.notification.showSuccess('Transformer created successfully', 'Create Transformer');
                    return new LoadTransformersByFeederIdAction(transformer.feederId);
                },
                error => this.notification.showError(error.error, 'Create Transformer')
                )
            );
        })
    );
}
