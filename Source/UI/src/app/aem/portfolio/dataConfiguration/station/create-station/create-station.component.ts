import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { Subscription, Observable } from 'rxjs';
import { Taluka, District, Village, AppRoot } from 'src/app/aem/shared/models';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';
import { DataConfigurationRootState } from '../../data.configuration.reducer';
import { LoadTalukasByDistrictAction, LoadVillagesByTalukaAction } from '../../village/village.actions';
import { trackByKeyValue } from '../pipes';
import { ResetStationFormAction, CreateStationAction } from '../station.actions';
import { StationFormValue } from '../station.state';

@Component({
  selector: 'app-create-station',
  templateUrl: './create-station.component.html',
  styleUrls: ['./create-station.component.css']
})
export class CreateStationComponent implements OnInit, OnDestroy {
  trackBy = trackByKeyValue;
  talukas: Taluka[];
  districts: District[];
  villages: Village[];
  getTalukasByDistrictIdSubscription: Subscription;
  getVillagesByTalukaIdSubscription: Subscription;
  getDistrictsAndLoadTypesSubscription: Subscription;
  appRoot$: Observable<AppRoot>;
  formState$: Observable<FormGroupState<StationFormValue>>;

  constructor(private service: SharedDataService,
              private store: Store<DataConfigurationRootState>) {
                this.appRoot$ = store.select(p => p.portfolio);
                this.formState$ = store.select(p => p.dataConfiguration.station.formState);
               }

  ngOnDestroy(): void {
    // this.getDistrictsAndLoadTypesSubscription.unsubscribe();
  }

  trackItem(_, item) {
    return  item.key;
  }

  ngOnInit(): void {
    // this.getDistrictsAndLoadTypesSubscription = this.service.getDistrictsAndLoadTypes()
    // .subscribe(p => {
    //   this.districts = p.districts;
    // });
  }

  getTalukasByDistrictId(event) {
    this.store.dispatch(new LoadTalukasByDistrictAction(event.target.value));
    // this.getTalukasByDistrictIdSubscription = this.service.getTalukasByDistrictId(event.target.value)
    // .subscribe(p => {
    //   this.talukas = p;
    //   this.getTalukasByDistrictIdSubscription.unsubscribe();
    // });
  }

  getVillagesByTalukaId(event) {
    console.log(event);
    this.store.dispatch(new LoadVillagesByTalukaAction(event.target.value));
    // this.getVillagesByTalukaIdSubscription = this.service.getVillagesByTalukaId(event.target.value)
    // .subscribe(p => {
    //   this.villages = p;
    //   this.getVillagesByTalukaIdSubscription.unsubscribe();
    // });
  }

  clearForm() {
    this.store.dispatch(new ResetStationFormAction());
  }

  createStation() {
    this.store.dispatch(new CreateStationAction());
  }
}
