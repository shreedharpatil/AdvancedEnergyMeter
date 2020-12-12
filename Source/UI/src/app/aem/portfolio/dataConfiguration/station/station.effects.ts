import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { stat } from 'fs';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { map, flatMap, withLatestFrom, filter } from 'rxjs/operators';
import { get, post } from 'src/app/aem/shared/http/http-helper';
import { SaveStation, Station } from 'src/app/aem/shared/models';
import { NotificationService } from 'src/app/aem/shared/notification.service';
import { LoadStationsByVillageIdAction } from 'src/app/aem/shared/shared.data.actions';
import { HideLoaderAction } from 'src/app/aem/shared/spinner/spinner-actions';
import { SaveStationsAction } from '../../portfolio/portfolio.actions';
import { DataConfigurationRootState } from '../data.configuration.reducer';
import { CreateStationAction, LoadStationsByVillageAction, ResetStationFormAction } from './station.actions';
import { StationFormValue } from './station.state';


@Injectable()
export class StationEffects {
    constructor(private store: Store<DataConfigurationRootState>,
                private http: HttpClient,
                private actions$: Actions,
                private notification: NotificationService) {}

    @Effect()
    addStation$: Observable<Action> = this.actions$.pipe(
        ofType<CreateStationAction>(CreateStationAction.TYPE),
        withLatestFrom(this.store.select(p => p.dataConfiguration.station.formState)),
        filter(([_, fs]) => fs.isValid),
        map(([, fs]) => this.mapToStation(fs)),
        flatMap((station) => {
            return post(this.http,
                'contextapi/station',
                station,
                () => {
                    this.notification.showSuccess('Station created successfully', 'Create Station');
                    return [new HideLoaderAction(), new LoadStationsByVillageIdAction(station.villageId), new ResetStationFormAction()];
                },
                'Create Station');
        })
    );

    @Effect()
    loadStationsByVillage$: Observable<Action> = this.actions$.pipe(
        ofType<LoadStationsByVillageAction>(LoadStationsByVillageAction.TYPE),
        withLatestFrom(this.store.select(p => p.portfolio.stations)),
        filter(([action, stations]) => !(stations.has(action.villageId))),
        flatMap(([action, _]) => {
            return get<Station[]>(this.http,
                `contextapi/station/${action.villageId}` ,
                (p) => {
                    return [new HideLoaderAction(),
                        new SaveStationsAction(new SaveStation(action.villageId, p))];
                });
        })
    );

    mapToStation(fs: FormGroupState<StationFormValue>) {
        return {
            ...fs.value,
            name: fs.value.stationName
         };
    }
}
