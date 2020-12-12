import { startWith, mergeMap, catchError } from 'rxjs/operators';
import { Observable, ObservableInput, concat } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { HandleApiErrorAction } from './http-helper-actions';
import { ShowLoaderAction } from '../spinner/spinner-actions';

export function post<TResponse = null>(http: HttpClient,
                                       url: string,
                                       payload: any,
                                       project: (resp: TResponse) => ObservableInput<Action>,
                                       errorMessageTitle: string): Observable<Action> {
    const obs = (() => {
        return http.post<TResponse>(environment.apiBaseUrl + url, payload);
    })();

    return handleResponse(
        obs, project, errorMessageTitle
    );
}

export function get<TResponse = null>(http: HttpClient,
                                      url: string,
                                      project: (resp: TResponse) => ObservableInput<Action>,
                                      errorMessageTitle: string = 'An error has occurred while fetching data.'): Observable<Action> {
const obs = (() => {
return http.get<TResponse>(environment.apiBaseUrl + url);
})();

return handleResponse(
obs, project, errorMessageTitle
);
}

function handleResponse<TResponse = null>(source: Observable<TResponse>,
                                          project: (resp: HttpResponse<TResponse> | TResponse) => ObservableInput<Action>,
                                          errorMessageTitle: string):
    Observable<Action> {
    const obs = source.pipe(
        mergeMap(project),
        catchError<Action, ObservableInput<Action>>(resp => [new HandleApiErrorAction(errorMessageTitle, resp)])
    );

    return surroundWithLoadingBar(obs);
}

function surroundWithLoadingBar(obs: Observable<Action>) {
    return concat(
        obs
    ).pipe(startWith(new ShowLoaderAction()));
}
