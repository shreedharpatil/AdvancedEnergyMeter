import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { map, flatMap, withLatestFrom, filter } from 'rxjs/operators';
import { get, post } from 'src/app/aem/shared/http/http-helper';
import { Section, SaveSection } from 'src/app/aem/shared/models';
import { NotificationService } from 'src/app/aem/shared/notification.service';
import { LoadSectiosByStationIdAction } from 'src/app/aem/shared/shared.data.actions';
import { HideLoaderAction } from 'src/app/aem/shared/spinner/spinner-actions';
import { SaveSectionsAction } from '../../portfolio/portfolio.actions';
import { DataConfigurationRootState } from '../data.configuration.reducer';
import { CreateSectionAction, LoadSectionsByStationAction, ResetSectionFormAction } from './section.actions';
import { SectionFormValue } from './section.state';

@Injectable()
export class SectionEffects {
    constructor(private store: Store<DataConfigurationRootState>,
                private http: HttpClient,
                private actions$: Actions,
                private notification: NotificationService) {}

    @Effect()
    addSection$: Observable<Action> = this.actions$.pipe(
        ofType<CreateSectionAction>(CreateSectionAction.TYPE),
        withLatestFrom(this.store.select(p => p.dataConfiguration.section.formState)),
        filter(([_, fs]) => fs.isValid),
        map(([, fs]) => this.mapToSection(fs)),
        flatMap((section) => {
            return post(this.http,
                'contextapi/section',
                section,
                () => {
                    this.notification.showSuccess('Section created successfully', 'Create Section');
                    return [new HideLoaderAction(), new LoadSectiosByStationIdAction(section.stationId), new ResetSectionFormAction()];
                },
                'Create Section');
        })
    );

    @Effect()
    loadSectionsByStation$: Observable<Action> = this.actions$.pipe(
        ofType<LoadSectionsByStationAction>(LoadSectionsByStationAction.TYPE),
        withLatestFrom(this.store.select(p => p.portfolio.sections)),
        filter(([action, sections]) => !(sections.has(action.stationId))),
        flatMap(([action, _]) => {
            return get<Section[]>(this.http,
                `contextapi/section/${action.stationId}` ,
                (p) => {
                    return [new HideLoaderAction(),
                        new SaveSectionsAction(new SaveSection(action.stationId, p))];
                });
        })
    );

    mapToSection(fs: FormGroupState<SectionFormValue>) {
        return {
            ...fs.value,
            name: fs.value.sectionName
         };
    }
}
