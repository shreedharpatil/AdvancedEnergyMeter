import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, EMPTY } from 'rxjs';
import { HandleApiErrorAction } from './http-helper-actions';
import { map, concatMap, flatMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { NotificationService } from '../notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpHelperEffects {
    @Effect()
    handleApiErrorAction: Observable<Action> = this.actions$.pipe(
        ofType<HandleApiErrorAction>(HandleApiErrorAction.TYPE),
        map(p => p.payload),
        concatMap((p) => {
            this.spinner.hide();
            this.notification.showError(p.error.error, p.title);
            return EMPTY;
        }),

        flatMap(() => [])
    );

    constructor(private actions$: Actions,
                private notification: NotificationService,
                private spinner: NgxSpinnerService) {}
}