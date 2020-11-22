import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { Subscription, Observable } from 'rxjs';
import { Taluka, District, Village } from 'src/app/aem/shared/models';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';
import { ResetStationFormAction, CreateStationAction } from '../station.actions';
import { StationFormValue, StationState } from '../station.state';

@Component({
  selector: 'app-create-station',
  templateUrl: './create-station.component.html',
  styleUrls: ['./create-station.component.css']
})
export class CreateStationComponent implements OnInit, OnDestroy {

  talukas: Taluka[];
  districts: District[];
  villages: Village[];
  getTalukasByDistrictIdSubscription: Subscription;
  getVillagesByTalukaIdSubscription: Subscription;
  getDistrictsAndLoadTypesSubscription: Subscription;
  formState$: Observable<FormGroupState<StationFormValue>>;

  constructor(private service: SharedDataService,
              private store: Store<{ station: StationState}>) {
                this.formState$ = store.select(p => p.station.formState);
               }

  ngOnDestroy(): void {
    this.getDistrictsAndLoadTypesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getDistrictsAndLoadTypesSubscription = this.service.getDistrictsAndLoadTypes()
    .subscribe(p => {
      this.districts = p.districts;
    });
  }

  getTalukasByDistrictId(event) {
    this.getTalukasByDistrictIdSubscription = this.service.getTalukasByDistrictId(event.target.value)
    .subscribe(p => {
      this.talukas = p;
      this.getTalukasByDistrictIdSubscription.unsubscribe();
    });
  }

  getVillagesByTalukaId(event) {
    this.getVillagesByTalukaIdSubscription = this.service.getVillagesByTalukaId(event.target.value)
    .subscribe(p => {
      this.villages = p;
      this.getVillagesByTalukaIdSubscription.unsubscribe();
    });
  }

  clearForm() {
    this.store.dispatch(new ResetStationFormAction());
  }

  createStation() {
    this.store.dispatch(new CreateStationAction());
  }
}
