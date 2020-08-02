import { HttpClient } from '@angular/common/http';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, flatMap, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../../shared/notification.service';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Customer } from '../../shared/models';
import {
    CreateVillageAction,
    CreateStationAction,
    CreateSectionAction,
    CreateFeederAction,
    CreateTransformerAction
} from './portfolio.actions';
import {
    LoadVillagesByTalukaIdAction,
    LoadStationsByVillageIdAction,
    LoadSectiosByStationIdAction,
    LoadFeedersBySectionIdAction,
    LoadTransformersByFeederIdAction
} from '../../shared/shared.data.actions';
import { post } from '../../shared/http/http-helper';
import { HideLoaderAction } from '../../shared/spinner/spinner-actions';
import { LoadCustomersAction, LoadCustomersSucessAction, AddCustomerAction } from '../dataConfiguration/customer/customer.actions';

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

    @Effect()
    addCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<AddCustomerAction>(AddCustomerAction.TYPE),
        map(p => p.payload),
        flatMap((payload) => {
            return post(this.http,
                'contextapi/customer',
                payload.customer,
                () => {
                    this.notification.showSuccess('Customer created successfully', 'Register Customer');
                    return [new HideLoaderAction(), new LoadCustomersAction()];
                },
                'Register Customer');
        })
    );

    @Effect()
    addVillage$: Observable<Action> = this.actions$.pipe(
        ofType<CreateVillageAction>(CreateVillageAction.TYPE),
        map(p => p.payload),
        flatMap(village => {
            return post(this.http,
                'contextapi/village',
                village,
                () => {
                    this.notification.showSuccess('Village created successfully', 'Create Village');
                    return [new HideLoaderAction(), new LoadVillagesByTalukaIdAction(village.talukaId)];
                },
                'Create Village');
        })
    );

    @Effect()
    addStation$: Observable<Action> = this.actions$.pipe(
        ofType<CreateStationAction>(CreateStationAction.TYPE),
        map(p => p.payload),
        flatMap((station) => {
            return post(this.http,
                'contextapi/station',
                station,
                () => {
                    this.notification.showSuccess('Station created successfully', 'Create Station');
                    return [new HideLoaderAction(), new LoadStationsByVillageIdAction(station.villageId)];
                },
                'Create Station');
        })
    );

    @Effect()
    addSection$: Observable<Action> = this.actions$.pipe(
        ofType<CreateSectionAction>(CreateSectionAction.TYPE),
        map(p => p.payload),
        flatMap((section) => {
            return post(this.http,
                'contextapi/section',
                section,
                () => {
                    this.notification.showSuccess('Section created successfully', 'Create Section');
                    return [new HideLoaderAction(), new LoadSectiosByStationIdAction(section.stationId)];
                },
                'Create Section');
        })
    );

    @Effect()
    addFeeder$: Observable<Action> = this.actions$.pipe(
        ofType<CreateFeederAction>(CreateFeederAction.TYPE),
        map(p => p.payload),
        flatMap((feeder) => {
            return post(this.http,
                'contextapi/feeder',
                feeder,
                () => {
                    this.notification.showSuccess('Feeder created successfully', 'Create Feeder');
                    return [new HideLoaderAction(), new LoadFeedersBySectionIdAction(feeder.sectionId)];
                },
                'Create Feeder');
        })
    );

    @Effect()
    addTransformer$: Observable<Action> = this.actions$.pipe(
        ofType<CreateTransformerAction>(CreateTransformerAction.TYPE),
        map(p => p.payload),
        flatMap((transformer) => {
            return post(this.http,
                'contextapi/transformer',
                transformer,
                () => {
                    this.notification.showSuccess('Transformer created successfully', 'Create Transformer');
                    return [new HideLoaderAction(), new LoadTransformersByFeederIdAction(transformer.feederId)];
                },
                'Create Transformer');
        })
    );
}
