import { Action } from '@ngrx/store';
import { AppRootState } from 'src/app/app.state';
import { callNestedReducers } from '../../shared/ngrx';
import { CustomerReducer } from './customer/customer.reducer';
import { CustomerState, INITIAL_CUSTOMER_STATE } from './customer/customer.state';
import { FeederReducer } from './feeder/feeder.reducer';
import { FeederState, INITIAL_FEEDER_STATE } from './feeder/feeder.state';
import { SectionReducer } from './section/section.reducer';
import { INITIAL_SECTION_STATE, SectionState } from './section/section.state';
import { StationReducer } from './station/station.reducer';
import { INITIAL_STATION_STATE, StationState } from './station/station.state';
import { TransformerReducer } from './transformer/transformer.reducer';
import { INITIAL_TRANSFORMER_STATE, TransformerState } from './transformer/transformer.state';
import { VillageReducer } from './village/village.reducer';
import { INITIAL_VILLAGE_STATE, VillageState } from './village/village.state';


export interface DataConfigurationRootState extends AppRootState {
    dataConfiguration: DataConfigurationState;
}

export interface DataConfigurationState {
    customer: CustomerState;
    village: VillageState;
    station: StationState;
    section: SectionState;
    feeder: FeederState;
    transformer: TransformerState;
}

export const INITIAL_DATA_CONFIGURATION_STATE: DataConfigurationState = {
    customer: INITIAL_CUSTOMER_STATE,
    village: INITIAL_VILLAGE_STATE,
    station: INITIAL_STATION_STATE,
    section: INITIAL_SECTION_STATE,
    feeder: INITIAL_FEEDER_STATE,
    transformer: INITIAL_TRANSFORMER_STATE,
};

export function DataConfigurationReducer(state: DataConfigurationState = INITIAL_DATA_CONFIGURATION_STATE,
                                         action: Action): DataConfigurationState {

    state = callNestedReducers(state, action, {
            customer: CustomerReducer,
            village: VillageReducer,
            station: StationReducer,
            section: SectionReducer,
            feeder: FeederReducer,
            transformer: TransformerReducer,
    });

    switch (action.type) {
        default:
            return state;
    }
}

export const DATA_CONFIGURATION_FEATURE_NAME: keyof DataConfigurationRootState = 'dataConfiguration';
