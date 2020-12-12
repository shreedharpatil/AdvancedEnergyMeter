import { Action } from '@ngrx/store';


export class ResetTransformerFormAction implements Action {
    static readonly TYPE = 'transformer/RESET_TRANSFORMER_FORM';
    type = ResetTransformerFormAction.TYPE;
}

export class CreateTransformerAction implements Action {
    static readonly TYPE = 'transformer/CREATE_TRANSFORMER';
    type = CreateTransformerAction.TYPE;
}

export class LoadTransformersByFeederAction implements Action {
    static readonly TYPE = 'LOAD_TRANSFORMERS_BY_FEEDER_ID';
    type = LoadTransformersByFeederAction.TYPE;
    public feederId: number;
    constructor(feederId) {
        this.feederId = parseInt(feederId.toString(), 10);
    }
}

export type TransformerAction = CreateTransformerAction
                           | ResetTransformerFormAction
                           | LoadTransformersByFeederAction
                           ;
