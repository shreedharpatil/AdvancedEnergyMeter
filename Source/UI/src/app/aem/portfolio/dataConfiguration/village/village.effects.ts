import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { map, flatMap, withLatestFrom, filter } from 'rxjs/operators';
import { post } from 'src/app/aem/shared/http/http-helper';
import { NotificationService } from 'src/app/aem/shared/notification.service';
import { LoadVillagesByTalukaIdAction } from 'src/app/aem/shared/shared.data.actions';
import { HideLoaderAction } from 'src/app/aem/shared/spinner/spinner-actions';
import { DataConfigurationRootState } from '../data.configuration.reducer';
import { CreateVillageAction, ResetVillageFormAction } from './village.actions';
import { VillageFormState } from './village.state';


@Injectable()
export class VillageEffects {

    constructor(private store: Store<DataConfigurationRootState>,
                private http: HttpClient,
                private actions$: Actions,
                private notification: NotificationService) {}

    @Effect()
    addVillage$: Observable<Action> = this.actions$.pipe(
        ofType<CreateVillageAction>(CreateVillageAction.TYPE),
        withLatestFrom(this.store.select(p => p.dataConfiguration.village.formState)),
        filter(([, fs]) => fs.isValid),
        map(([_, fs]) => this.mapVillage(fs)),
        flatMap((village => {
            return post(this.http,
                'contextapi/village',
                village,
                () => {
                    this.notification.showSuccess('Village created successfully', 'Create Village');
                    return [new HideLoaderAction(),
                        new LoadVillagesByTalukaIdAction(village.talukaId),
                        new ResetVillageFormAction()];
                },
                'Create Village');
        })
    ));

    mapVillage(fs: FormGroupState<VillageFormState>) {
        return { name: fs.value.villageName, talukaId: fs.value.talukaId, };
    }
}