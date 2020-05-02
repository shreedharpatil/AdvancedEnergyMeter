import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { AppRoot, District, LoadType, Taluka, SaveTaluka, Village, SaveVillage } from './models';
import { environment } from 'src/environments/environment';
import { SaveDistrictsAction, SaveLoadTypesAction, SaveTaulkasAction, SaveVillagesAction } from '../portfolio/portfolio/portfolio.actions';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService implements OnDestroy {
appRoot: Observable<AppRoot>;
appData: AppRoot;
defaultDistrict = new District(0, '-----Please Select-----');
defaultTaluka = new Taluka(0, '-----Please Select-----');
defaultVillage = new Village(0, '-----Please Select-----');
defaultLoadType = new LoadType(0, '-----Please Select-----');
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
