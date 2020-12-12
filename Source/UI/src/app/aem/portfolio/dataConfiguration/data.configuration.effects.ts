import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, flatMap, map, withLatestFrom } from 'rxjs/operators';
import { get } from '../../shared/http/http-helper';
import { District, LoadType, SaveTaluka, Taluka } from '../../shared/models';
import { HideLoaderAction } from '../../shared/spinner/spinner-actions';
import { SaveDistrictsAction, SaveLoadTypesAction, SaveTaulkasAction } from '../portfolio/portfolio.actions';
import { LoadDistrictsAction, LoadLoadTypesAction } from './data.configuration.actions';
import { DataConfigurationRootState } from './data.configuration.reducer';
import { LoadTalukasByDistrictAction, SaveFilteredTalukasAction } from './village/village.actions';

@Injectable()
export class DataConfigurationEffects {
    constructor(private store: Store<DataConfigurationRootState>,
                private http: HttpClient,
                private actions$: Actions) {}

    @Effect()
    loadDistricts$: Observable<Action> = this.actions$.pipe(
        ofType<LoadDistrictsAction>(LoadDistrictsAction.TYPE),
        flatMap((_) => {
            return get<District[]>(this.http,
                'contextapi/district',
                (p) => {
                    return [new HideLoaderAction(), new SaveDistrictsAction(p)];
                });
        })
    );

    @Effect()
    loadLoadTypes$: Observable<Action> = this.actions$.pipe(
        ofType<LoadLoadTypesAction>(LoadLoadTypesAction.TYPE),
        flatMap((_) => {
            return get<LoadType[]>(this.http,
                'contextapi/loadtype',
                (p) => {
                    return [new HideLoaderAction(), new SaveLoadTypesAction(p)];
                });
        })
    );

    @Effect()
    loadTalukasByDistrict$: Observable<Action> = this.actions$.pipe(
        ofType<LoadTalukasByDistrictAction>(LoadTalukasByDistrictAction.TYPE),
        withLatestFrom(this.store.select(p => p.portfolio.talukas)),
        flatMap(([action, talukas]) => {
            if (talukas.has(action.districtId)) {
                return [new SaveFilteredTalukasAction(talukas.get(action.districtId))];
            }

            return get<Taluka[]>(this.http,
                `contextapi/taluka/${action.districtId}` ,
                (p) => {
                    return [new HideLoaderAction(),
                        new SaveTaulkasAction(new SaveTaluka(action.districtId, p)),
                        new SaveFilteredTalukasAction(p)];
                });
        })
    );
}
