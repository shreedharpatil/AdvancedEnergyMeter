import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { District, Taluka, Village, Station, Section, AppRoot } from 'src/app/aem/shared/models';
import { Store } from '@ngrx/store';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';
import { FeederFormValue } from '../feeder.state';
import { FormGroupState } from 'ngrx-forms';
import { CreateFeederAction, ResetFeederFormAction } from '../feeder.actions';
import { DataConfigurationRootState } from '../../data.configuration.reducer';
import { LoadSectionsByStationAction } from '../../section/section.actions';
import { LoadStationsByVillageAction } from '../../station/station.actions';
import { LoadTalukasByDistrictAction, LoadVillagesByTalukaAction } from '../../village/village.actions';

@Component({
  selector: 'app-create-feeder',
  templateUrl: './create-feeder.component.html',
  styleUrls: ['./create-feeder.component.css']
})
export class CreateFeederComponent implements OnInit, OnDestroy {
  talukas: Taluka[];
  districts: District[];
  villages: Village[];
  stations: Station[];
  sections: Section[];
  getTalukasByDistrictIdSubscription: Subscription;
  getVillagesByTalukaIdSubscription: Subscription;
  getDistrictsAndLoadTypesSubscription: Subscription;
  getStationsByVillageIdSubscription: Subscription;
  getSectionsByStationIdSubscription: Subscription;
  appRoot$: Observable<AppRoot>;
  formState$: Observable<FormGroupState<FeederFormValue>>;

  constructor(private service: SharedDataService,
              private store: Store<DataConfigurationRootState>) {
                this.appRoot$ = store.select(p => p.portfolio);
                this.formState$ = store.select(p => p.dataConfiguration.feeder.formState);
               }

  ngOnDestroy(): void {
    // this.getDistrictsAndLoadTypesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    // this.getDistrictsAndLoadTypesSubscription = this.service.getDistrictsAndLoadTypes()
    //   .subscribe(p => {
    //     this.districts = p.districts;
    //   });
  }

  getTalukasByDistrictId(event) {
    this.store.dispatch(new LoadTalukasByDistrictAction(event.target.value));
    // this.getTalukasByDistrictIdSubscription = this.service.getTalukasByDistrictId(event.target.value)
    //   .subscribe(p => {
    //     this.talukas = p;
    //     this.getTalukasByDistrictIdSubscription.unsubscribe();
    //   });
  }

  getVillagesByTalukaId(event) {
    this.store.dispatch(new LoadVillagesByTalukaAction(event.target.value));
    // this.getVillagesByTalukaIdSubscription = this.service.getVillagesByTalukaId(event.target.value)
    //   .subscribe(p => {
    //     this.villages = p;
    //     this.getVillagesByTalukaIdSubscription.unsubscribe();
    //   });
  }

  getStationsByVillageId(event) {
    this.store.dispatch(new LoadStationsByVillageAction(event.target.value));
    // this.getStationsByVillageIdSubscription = this.service.getStationsByVillageId(event.target.value)
    //   .subscribe(p => {
    //     this.stations = p;
    //     this.getStationsByVillageIdSubscription.unsubscribe();
    //   });
  }

  getSectionsByStationId(event) {
    this.store.dispatch(new LoadSectionsByStationAction(event.target.value));
    // this.getSectionsByStationIdSubscription = this.service.getSectionsByStationId(event.target.value)
    //   .subscribe(p => {
    //     this.sections = p;
    //     this.getSectionsByStationIdSubscription.unsubscribe();
    //   });
  }

  clearForm() {
    this.store.dispatch(new ResetFeederFormAction());
  }

  createFeeder() {
    this.store.dispatch(new CreateFeederAction());
  }
}
