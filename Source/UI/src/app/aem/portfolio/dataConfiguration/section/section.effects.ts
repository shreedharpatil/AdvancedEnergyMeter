import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { fstat } from 'fs';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { map, flatMap, withLatestFrom, filter } from 'rxjs/operators';
import { post } from 'src/app/aem/shared/http/http-helper';
import { NotificationService } from 'src/app/aem/shared/notification.service';
import { LoadSectiosByStationIdAction, LoadStationsByVillageIdAction } from 'src/app/aem/shared/shared.data.actions';
import { HideLoaderAction } from 'src/app/aem/shared/spinner/spinner-actions';
import { CreateSectionAction, ResetSectionFormAction } from './section.actions';
import { SectionState, SectionFormValue } from './section.state';

@Injectable()
export class SectionEffects {
    constructor(private store: Store<{section: SectionState}>,
                private http: HttpClient,
                private actions$: Actions,
                private notification: NotificationService) {}

    @Effect()
    addSection$: Observable<Action> = this.actions$.pipe(
        ofType<CreateSectionAction>(CreateSectionAction.TYPE),
        withLatestFrom(this.store.select(p => p.section.formState)),
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

    mapToSection(fs: FormGroupState<SectionFormValue>) {
        return {
            ...fs.value,
            name: fs.value.sectionName
         };
    }
}
