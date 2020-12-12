import {AppRoot, SaveTaluka,
    SaveVillage, SaveStation,
    SaveSection, SaveFeeder, SaveTransformer,
    defaultTaluka, defaultVillage, defaultDistrict, defaultLoadType} from 'src/app/aem/shared/models';
import { PortfolioAction,
    SaveDistrictsAction,
    SaveFeedersAction,
    SaveLoadTypesAction,
    SaveSectionsAction,
    SaveStationsAction,
    SaveTaulkasAction,
    SaveTransformersAction,
    SaveVillagesAction } from './portfolio.actions';

const appState: AppRoot = new AppRoot();

export function PortfolioReducer(state: AppRoot = appState, action: PortfolioAction): AppRoot {
    switch (action.type) {
        case SaveDistrictsAction.TYPE:
            return { ...state, districts : [defaultDistrict, ...action.payload] };
            break;
        case SaveLoadTypesAction.TYPE:
            return { ...state, loadTypes : [defaultLoadType, ...action.payload] };
            break;
        case SaveTaulkasAction.TYPE:
            const t = action.payload as SaveTaluka;
            return { ...state, talukas: state.talukas.set(t.districtId, [defaultTaluka, ...t.talukas])};
            break;
        case SaveVillagesAction.TYPE:
            const p = action.payload as SaveVillage;
            return { ...state, villages: state.villages.set(p.talukaId, [defaultVillage, ...p.villages]) };
            break;
        case SaveStationsAction.TYPE:
            const station = action.payload as SaveStation;
            return { ...state, stations: state.stations.set(station.villageId, [defaultVillage, ...station.stations]) };
            break;
        case SaveSectionsAction.TYPE:
            const section = action.payload as SaveSection;
            return { ...state, sections: state.sections.set(section.stationId, [defaultVillage, ...section.sections]) };
            break;
        case SaveFeedersAction.TYPE:
            const feeder = action.payload as SaveFeeder;
            return { ...state, feeders: state.feeders.set(feeder.sectionId, [defaultVillage, ...feeder.feeders]) };
            break;
        case SaveTransformersAction.TYPE:
            const tc = action.payload as SaveTransformer;
            return { ...state, transformers: state.transformers.set(tc.feederId, [defaultVillage, ...tc.transformers]) };
            break;
        default:
            return state;
    }
}
