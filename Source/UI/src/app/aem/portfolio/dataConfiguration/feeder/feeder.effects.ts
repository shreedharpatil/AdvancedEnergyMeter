import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { map, flatMap, withLatestFrom, filter } from 'rxjs/operators';
import { post } from 'src/app/aem/shared/http/http-helper';
import { NotificationService } from 'src/app/aem/shared/notification.service';
import { LoadFeedersBySectionIdAction } from 'src/app/aem/shared/shared.data.actions';
import { HideLoaderAction } from 'src/app/aem/shared/spinner/spinner-actions';
import { CreateFeederAction, ResetFeederFormAction } from './feeder.actions';
import { FeederState, FeederFormValue } from './feeder.state';

@Injectable()
export class FeederEffects {
    constructor(private store: Store<{feeder: FeederState}>,
                private http: HttpClient,
                private actions$: Actions,
                private notification: NotificationService) {}

    @Effect()
    addFeeder$: Observable<Action> = this.actions$.pipe(
        ofType<CreateFeederAction>(CreateFeederAction.TYPE),
        withLatestFrom(this.store.select(p => p.feeder.formState)),
        filter(([_, fs]) => fs.isValid),
        map(([, fs]) => this.mapToFeeder(fs)),
        flatMap((feeder) => {
            return post(this.http,
                'contextapi/feeder',
                feeder,
                () => {
                    this.notification.showSuccess('Feeder created successfully', 'Create Feeder');
                    return [new HideLoaderAction(), new LoadFeedersBySectionIdAction(feeder.sectionId), new ResetFeederFormAction()];
                },
                'Create Feeder');
        })
    );

    mapToFeeder(fs: FormGroupState<FeederFormValue>) {
        return {
            ...fs.value,
            name: fs.value.feederName
         };
    }
}
