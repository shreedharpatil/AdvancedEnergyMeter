import { Action } from '@ngrx/store';


export class ResetSectionFormAction implements Action {
    static readonly TYPE = 'section/RESET_SECTION_FORM';
    type = ResetSectionFormAction.TYPE;
}

export class CreateSectionAction implements Action {
    static readonly TYPE = 'section/CREATE_SECTION';
    type = CreateSectionAction.TYPE;
}

export type SectionAction = CreateSectionAction
                           | ResetSectionFormAction
                           ;
