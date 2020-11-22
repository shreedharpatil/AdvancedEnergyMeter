import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { District, AppRoot, Taluka, Village, Station } from 'src/app/aem/shared/models';
import { Store } from '@ngrx/store';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';
import { SectionFormValue } from '../section.state';
import { CreateSectionAction, ResetSectionFormAction } from '../section.actions';
import { FormGroupState } from 'ngrx-forms';
import { DataConfigurationRootState } from '../../data.configuration.reducer';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.css']
})
export class CreateSectionComponent implements OnInit, OnDestroy {
  talukas: Taluka[];
  districts: District[];
  villages: Village[];
  stations: Station[];
  getTalukasByDistrictIdSubscription: Subscription;
  getVillagesByTalukaIdSubscription: Subscription;
  getDistrictsAndLoadTypesSubscription: Subscription;
  getStationsByVillageIdSubscription: Subscription;
  formState$: Observable<FormGroupState<SectionFormValue>>;

  constructor(private service: SharedDataService,
              private store: Store<DataConfigurationRootState>) {
                this.formState$ = store.select(p => p.dataConfiguration.section.formState);
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

  getStationsByVillageId(event) {
    this.getStationsByVillageIdSubscription = this.service.getStationsByVillageId(event.target.value)
      .subscribe(p => {
        this.stations = p;
        this.getStationsByVillageIdSubscription.unsubscribe();
      });
  }

  clearForm() {
    this.store.dispatch(new ResetSectionFormAction());
  }

  createStation() {
    this.store.dispatch(new CreateSectionAction());
  }
}
