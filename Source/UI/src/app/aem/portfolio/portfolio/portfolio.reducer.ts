import {AppRoot, Feeder, SaveTaluka, SaveVillage} from 'src/app/aem/shared/models';
import { PortfolioAction } from './portfolio.actions';
import { PortfolioActionType } from './portfolio-action-type';

const appState: AppRoot = new AppRoot();

export function PortfolioReducer(state: AppRoot = appState, action: PortfolioAction) {
    switch (action.type) {
        case PortfolioActionType.SaveDistrict:
            return { ...state, districts : action.payload };
            break;
        case PortfolioActionType.SaveLoadTypes:
            return { ...state, loadTypes : action.payload };
            break;
        case PortfolioActionType.SaveTalukas:
            const t = action.payload as SaveTaluka;
            return { ...state, taluks: state.talukas.set(t.districtId, t.talukas)};
            break;
        case PortfolioActionType.SaveVillages:
            const p = action.payload as SaveVillage;
            return { ...state, villages: state.villages.set(p.talukaId, p.villages) };
            break;
        default:
            return state;
    }
}
