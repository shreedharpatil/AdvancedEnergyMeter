import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { map, flatMap, withLatestFrom, filter } from 'rxjs/operators';
import { get, post } from 'src/app/aem/shared/http/http-helper';
import { SaveTransformer, Transformer } from 'src/app/aem/shared/models';
import { NotificationService } from 'src/app/aem/shared/notification.service';
import { LoadTransformersByFeederIdAction } from 'src/app/aem/shared/shared.data.actions';
import { HideLoaderAction } from 'src/app/aem/shared/spinner/spinner-actions';
import { SaveTransformersAction } from '../../portfolio/portfolio.actions';
import { DataConfigurationRootState } from '../data.configuration.reducer';
import { CreateTransformerAction, LoadTransformersByFeederAction, ResetTransformerFormAction } from './transformer.actions';
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

    @Effect()
    loadTransformersByFeeder$: Observable<Action> = this.actions$.pipe(
        ofType<LoadTransformersByFeederAction>(LoadTransformersByFeederAction.TYPE),
        withLatestFrom(this.store.select(p => p.portfolio.transformers)),
        filter(([action, transformers]) => !(transformers.has(action.feederId))),
        flatMap(([action, _]) => {
            return get<Transformer[]>(this.http,
                `contextapi/transformer/${action.feederId}` ,
                (p) => {
                    return [new HideLoaderAction(),
                        new SaveTransformersAction(new SaveTransformer(action.feederId, p))];
                });
        })
    );

    mapToTransformer(fs: FormGroupState<TransformerFormValue>) {
        return {
            ...fs.value,
            name: fs.value.transformerName
         };
    }
}
