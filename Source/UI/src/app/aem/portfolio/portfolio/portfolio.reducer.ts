import {AppRoot, SaveTaluka,
    SaveVillage, SaveStation,
    SaveSection, SaveFeeder, SaveTransformer,
    District, LoadType} from 'src/app/aem/shared/models';
import { PortfolioAction } from './portfolio.actions';
import { PortfolioActionType } from './portfolio-action-type';

const appState: AppRoot = new AppRoot();

export function PortfolioReducer(state: AppRoot = appState, action: PortfolioAction): AppRoot {
    switch (action.type) {
        case PortfolioActionType.SaveDistrict:
            return { ...state, districts : action.payload as District[] };
            break;
        case PortfolioActionType.SaveLoadTypes:
            return { ...state, loadTypes : action.payload as LoadType[] };
            break;
        case PortfolioActionType.SaveTalukas:
            const t = action.payload as SaveTaluka;
            return { ...state, talukas: state.talukas.set(t.districtId, t.talukas)};
            break;
        case PortfolioActionType.SaveVillages:
            const p = action.payload as SaveVillage;
            return { ...state, villages: state.villages.set(p.talukaId, p.villages) };
            break;
        case PortfolioActionType.SaveStations:
            const station = action.payload as SaveStation;
            return { ...state, stations: state.stations.set(station.villageId, station.stations) };
            break;
        case PortfolioActionType.SaveSections:
            const section = action.payload as SaveSection;
            return { ...state, sections: state.sections.set(section.stationId, section.sections) };
            break;
        case PortfolioActionType.SaveFeeders:
            const feeder = action.payload as SaveFeeder;
            return { ...state, feeders: state.feeders.set(feeder.sectionId, feeder.feeders) };
            break;
        case PortfolioActionType.SaveTransformers:
            const tc = action.payload as SaveTransformer;
            return { ...state, transformers: state.transformers.set(tc.feederId, tc.transformers) };
            break;
        default:
            return state;
    }
}
