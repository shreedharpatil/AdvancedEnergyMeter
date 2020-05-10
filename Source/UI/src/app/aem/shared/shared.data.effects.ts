import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { LoadVillagesByTalukaIdAction,
         LoadStationsByVillageIdAction,
         LoadSectiosByStationIdAction,
         LoadFeedersBySectionIdAction,
         LoadTransformersByFeederIdAction } from './shared.data.actions';
import { map, flatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppRoot,
         Village,
         SaveVillage,
         Station,
         SaveStation,
         SaveSection,
         SaveFeeder,
         Section,
         Feeder,
         Transformer,
         SaveTransformer } from './models';
import { NotificationService } from './notification.service';
import { SaveVillagesAction,
         SaveStationsAction,
         SaveSectionsAction,
         SaveFeedersAction,
         SaveTransformersAction } from '../portfolio/portfolio/portfolio.actions';

@Injectable()
export class SharedDataEffects {
    constructor(private actions$: Actions,
                private http: HttpClient,
                private store: Store<AppRoot>,
                private notification: NotificationService) {}

    baseUrl = environment.apiBaseUrl;

    @Effect()
    loadVillagesByTalukaId$: Observable<Action> = this.actions$.pipe(
        ofType<LoadVillagesByTalukaIdAction>(LoadVillagesByTalukaIdAction.TYPE),
        map(p => p.payload),
        flatMap((talukaId) => {
            return this.http.get<Village[]>(this.baseUrl + 'contextapi/village/' + talukaId)
            .pipe(
                map(p => {
                    return new SaveVillagesAction(new SaveVillage(talukaId, p));
                },
                error => this.notification.showError(error.error, 'Load Villages')
                )
            );
        })
    );

    @Effect()
    loadStationsByVillageId$: Observable<Action> = this.actions$.pipe(
        ofType<LoadStationsByVillageIdAction>(LoadStationsByVillageIdAction.TYPE),
        map(p => p.payload),
        flatMap((villageId) => {
            return this.http.get<Station[]>(this.baseUrl + 'contextapi/station/' + villageId)
            .pipe(
                map(p => {
                    return new SaveStationsAction(new SaveStation(villageId, p));
                },
                error => this.notification.showError(error.error, 'Load Stations')
                )
            );
        })
    );

    @Effect()
    loadSectiosByStationId$: Observable<Action> = this.actions$.pipe(
        ofType<LoadSectiosByStationIdAction>(LoadSectiosByStationIdAction.TYPE),
        map(p => p.payload),
        flatMap((stationId) => {
            return this.http.get<Section[]>(this.baseUrl + 'contextapi/section/' + stationId)
            .pipe(
                map(p => {
                    return new SaveSectionsAction(new SaveSection(stationId, p));
                },
                error => this.notification.showError(error.error, 'Load Sections')
                )
            );
        })
    );

    @Effect()
    loadFeedersBySectionId$: Observable<Action> = this.actions$.pipe(
        ofType<LoadFeedersBySectionIdAction>(LoadFeedersBySectionIdAction.TYPE),
        map(p => p.payload),
        flatMap((sectionId) => {
            return this.http.get<Feeder[]>(this.baseUrl + 'contextapi/feeder/' + sectionId)
            .pipe(
                map(p => {
                    return new SaveFeedersAction(new SaveFeeder(sectionId, p));
                },
                error => this.notification.showError(error.error, 'Load Feeders')
                )
            );
        })
    );

    @Effect()
    loadTransformersByFeederId$: Observable<Action> = this.actions$.pipe(
        ofType<LoadTransformersByFeederIdAction>(LoadTransformersByFeederIdAction.TYPE),
        map(p => p.payload),
        flatMap((feederId) => {
            return this.http.get<Transformer[]>(this.baseUrl + 'contextapi/transformer/' + feederId)
            .pipe(
                map(p => {
                    return new SaveTransformersAction(new SaveTransformer(feederId, p));
                },
                error => this.notification.showError(error.error, 'Load Transformers')
                )
            );
        })
    );
}
