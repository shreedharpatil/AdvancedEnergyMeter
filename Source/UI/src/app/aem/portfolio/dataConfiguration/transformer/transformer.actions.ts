import { Action } from '@ngrx/store';


export class ResetTransformerFormAction implements Action {
    static readonly TYPE = 'transformer/RESET_TRANSFORMER_FORM';
    type = ResetTransformerFormAction.TYPE;
}

export class CreateTransformerAction implements Action {
    static readonly TYPE = 'transformer/CREATE_TRANSFORMER';
    type = CreateTransformerAction.TYPE;
}

export type TransformerAction = CreateTransformerAction
                           | ResetTransformerFormAction
                           ;
