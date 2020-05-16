import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, EMPTY } from 'rxjs';
import { ShowLoaderAction, HideLoaderAction } from './spinner-actions';
import { delay, concatMap, flatMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { NotificationService } from '../notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class SpinnerEffects {
    @Effect()
    showLoader: Observable<Action> = this.actions$.pipe(
        ofType<ShowLoaderAction>(ShowLoaderAction.TYPE),
        delay(0),
        concatMap(() => {
            this.spinner.show();
            return EMPTY;
        }),

        flatMap(() => [])
    );

    @Effect()
    closeLoader: Observable<Action> = this.actions$.pipe(
        ofType<HideLoaderAction>(HideLoaderAction.TYPE),
        delay(0),
        concatMap(() => {
            this.spinner.hide();
            return EMPTY;
        }),

        flatMap(() => [])
    );

    constructor(private actions$: Actions,
                private notification: NotificationService,
                private spinner: NgxSpinnerService) {}
}