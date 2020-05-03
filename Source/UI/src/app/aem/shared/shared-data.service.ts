import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { AppRoot, District, LoadType, Taluka, SaveTaluka, Village, SaveVillage, Station, SaveStation, Section, SaveSection, Feeder, SaveFeeder, Transformer, SaveTransformer } from './models';
import { environment } from 'src/environments/environment';
import { 
  SaveDistrictsAction,
  SaveLoadTypesAction,
  SaveTaulkasAction,
  SaveVillagesAction,
  SaveStationsAction,
  SaveSectionsAction,
  SaveFeedersAction,
  SaveTransformersAction
} from '../portfolio/portfolio/portfolio.actions';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService implements OnDestroy {
appRoot: Observable<AppRoot>;
private pleaseSelect = '-----Please Select-----';
appData: AppRoot;
defaultDistrict = new District(0, this.pleaseSelect);
defaultTaluka = new Taluka(0, this.pleaseSelect);
defaultVillage = new Village(0, this.pleaseSelect);
defaultLoadType = new LoadType(0, this.pleaseSelect);
defaultstation = new Station(0, this.pleaseSelect);
defaultSection = new Section(0, this.pleaseSelect);
defaultFeeder = new Feeder(0, this.pleaseSelect);
defaultTransformer = new Transformer(0, this.pleaseSelect);

baseUrl = environment.apiBaseUrl;
getDistrictsAndLoadTypesObservable: Observable<{districts: District[], loadTypes: LoadType[]}>;
getDistrictsAndLoadTypesSubscription: Subscription;

// getTalukasByDistrictIdSubscription = new Subscription();

  constructor(private http: HttpClient, private store: Store<{portfolio: AppRoot}>) {
    this.getAllDistricts();
    this.getAllLoadTypes();
    this.appRoot = this.store.pipe(select('portfolio'));
    this.appRoot.subscribe(p => {
      this.appData = p;
    });
    this.initializegetDistrictsAndLoadTypesObservable();
   }
  ngOnDestroy(): void {
    this.getDistrictsAndLoadTypesSubscription.unsubscribe();
  }

  initializegetDistrictsAndLoadTypesObservable() {
    this.getDistrictsAndLoadTypesObservable = Observable.create(observer => {
      this.getDistrictsAndLoadTypesSubscription = this.appRoot
      .subscribe(p => {
        observer.next({ districts: [this.defaultDistrict, ...p.districts], loadTypes: [this.defaultLoadType, ...p.loadTypes] });
      });
    });
  }

  getDistrictsAndLoadTypes(): Observable<{districts: District[], loadTypes: LoadType[]}> {
    return this.getDistrictsAndLoadTypesObservable;
  }

  getTalukasByDistrictId(districtId: any): Observable<Taluka[]> {
      return Observable.create(observer => {
        // tslint:disable-next-line: radix
        let did = parseInt(districtId.toString());
        if (did <= 0) {
          return observer.next([this.defaultTaluka]);
        }
        const sub = this.appRoot
        .subscribe(p => {
          console.log('Service::getTalukasByDistrictId');
          if (p.talukas.has(districtId)) {
            const ts = p.talukas.get(districtId);
            const vs = [this.defaultTaluka, ...ts];
            observer.next(vs);
            try {
              sub.unsubscribe();
              console.log('Service::getTalukasByDistrictId::Unsubscribed');
            } catch { }
          } else {
            this.http.get<Taluka[]>(this.baseUrl + 'contextapi/taluka/' + districtId)
            .subscribe(p => {
              const vs = [this.defaultTaluka, ...p];
              observer.next(vs);
              this.store.dispatch(new SaveTaulkasAction(new SaveTaluka(districtId, (p as Taluka[]))));
              sub.unsubscribe();
              console.log('Service::getTalukasByDistrictId::Unsubscribed::Http');
            });
          }
        });

        // this.getTalukasByDistrictIdSubscription.add(sub);
      });
  }

  getVillagesByTalukaId(talukaId: any): Observable<Village[]> {
    return Observable.create(observer => {
      // tslint:disable-next-line: radix
      let tid = parseInt(talukaId.toString());
      if (tid <= 0) {
        return observer.next([this.defaultVillage]);
      }

      const sub = this.appRoot
      .subscribe(p => {
        console.log('Service::getVillagesByTalukaId');
        if (p.villages.has(talukaId)) {
          const villages = p.villages.get(talukaId);
          const vs = [this.defaultVillage, ...villages];
          observer.next(vs);
          try {
            sub.unsubscribe();
            console.log('Service::getVillagesByTalukaId::Unsubscribed');
          } catch { }
        } else {
          this.http.get<Village[]>(this.baseUrl + 'contextapi/village/' + talukaId)
          .subscribe(p => {
              const vs = [this.defaultVillage, ...p];
              observer.next(vs);
              this.store.dispatch(new SaveVillagesAction(new SaveVillage(talukaId, (p as Village[]))));
              sub.unsubscribe();
              console.log('Service::getVillagesByTalukaId::Unsubscribed::Http');
          });
        }
      });
    });
  }

  getStationsByVillageId(villageId: any): Observable<Station[]> {
    return Observable.create(observer => {
      const vid = parseInt(villageId.toString());
      if (vid <= 0) {
        return observer.next([this.defaultstation]);
      }

      if (this.appData.stations.has(villageId)) {
          const stations = [this.defaultstation, ...this.appData.stations.get(villageId)];
          return observer.next(stations);
      } else {
        this.http.get<Station[]>(this.baseUrl + 'contextapi/station/' + villageId)
        .subscribe(p => {
          this.store.dispatch(new SaveStationsAction(new SaveStation(villageId, p)));
          observer.next([this.defaultstation, ...p]);
        });
      }
    });
  }

  getSectionsByStationId(stationId: any): Observable<Section[]> {
    return Observable.create(observer => {
      const sid = parseInt(stationId.toString());
      if (sid <= 0) {
        return observer.next([this.defaultSection]);
      }

      if (this.appData.sections.has(stationId)) {
        return observer.next([this.defaultSection, ...this.appData.sections.get(stationId)]);
      } else{
        this.http.get<Section[]>(this.baseUrl + 'contextapi/section/' + stationId)
        .subscribe(p => {
          this.store.dispatch(new SaveSectionsAction(new SaveSection(stationId, p)));
          observer.next([this.defaultSection, ...p]);
        });
      }
    });
  }

  getFeedersBySectionId(sectionId: any): Observable<Feeder[]> {
    return Observable.create(observer => {
      const sid = parseInt(sectionId.toString());
      if (sid <= 0) {
        return observer.next([this.defaultFeeder]);
      }

      if (this.appData.feeders.has(sectionId)) {
        return observer.next([this.defaultFeeder, ...this.appData.feeders.get(sectionId)]);
      } else {
        this.http.get<Feeder[]>(this.baseUrl + 'contextapi/feeder/' + sectionId)
        .subscribe(p => {
          this.store.dispatch(new SaveFeedersAction(new SaveFeeder(sectionId, p)));
          observer.next([this.defaultFeeder, ...p]);
        });
      }
    });
  }

  getTransformersByFeederId(feederId: any): Observable<Transformer[]> {
    return Observable.create(observer => {
      const sid = parseInt(feederId.toString());
      if (sid <= 0) {
        return observer.next([this.defaultTransformer]);
      }

      if (this.appData.transformers.has(feederId)) {
        return observer.next([this.defaultTransformer, ...this.appData.transformers.get(feederId)]);
      } else {
        this.http.get<Transformer[]>(this.baseUrl + 'contextapi/transformer/' + feederId)
        .subscribe(p => {
          this.store.dispatch(new SaveTransformersAction(new SaveTransformer(feederId, p)));
          observer.next([this.defaultTransformer, ...p]);
        });
      }
    });
  }

  private getAllDistricts() {
    this.http.get(this.baseUrl + 'contextapi/district')
    .subscribe(res =>
      this.store.dispatch(new SaveDistrictsAction(res as District[]))
      );
  }

  private getAllLoadTypes() {
    this.http.get(this.baseUrl + 'contextapi/loadtype')
    .subscribe(res =>
      this.store.dispatch(new SaveLoadTypesAction(res as LoadType[]))
      );
  }
}
