import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { map, flatMap, withLatestFrom, filter } from 'rxjs/operators';
import { post } from 'src/app/aem/shared/http/http-helper';
import { NotificationService } from 'src/app/aem/shared/notification.service';
import { LoadTransformersByFeederIdAction } from 'src/app/aem/shared/shared.data.actions';
import { HideLoaderAction } from 'src/app/aem/shared/spinner/spinner-actions';
import { DataConfigurationRootState } from '../data.configuration.reducer';
import { CreateTransformerAction, ResetTransformerFormAction } from './transformer.actions';
import { TransformerFormValue } from './transformer.state';

@Injectable()
export class TransformerEffects {
    constructor(private store: Store<DataConfigurationRootState>,
                private http: HttpClient,
                private actions$: Actions,
                private notification: NotificationService) {}

    @Effect()
    addTransformer$: Observable<Action> = this.actions$.pipe(
        ofType<CreateTransformerAction>(CreateTransformerAction.TYPE),
        withLatestFrom(this.store.select(p => p.dataConfiguration.transformer.formState)),
        filter(([_, fs]) => fs.isValid),
        map(([, fs]) => this.mapToTransformer(fs)),
        flatMap((transformer) => {
            return post(this.http,
                'contextapi/transformer',
                transformer,
                () => {
                    this.notification.showSuccess('Transformer created successfully', 'Create Transformer');
                    return [new HideLoaderAction(),
                        new LoadTransformersByFeederIdAction(transformer.feederId),
                        new ResetTransformerFormAction()];
                },
                'Create Transformer');
        })
    );

    mapToTransformer(fs: FormGroupState<TransformerFormValue>) {
        return {
            ...fs.value,
            name: fs.value.transformerName
         };
    }
}
