import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppRoot, District, Taluka, Village } from 'src/app/aem/shared/models';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';

import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { VillageFormState } from '../village.state';
import { FormGroupState } from 'ngrx-forms';
import { CreateVillageAction, LoadTalukasByDistrictAction, ResetVillageFormAction } from '../village.actions';
import { DataConfigurationRootState } from '../../data.configuration.reducer';
import { trackByKeyValue } from '../../station/pipes';

@Component({
  selector: 'app-create-village',
  templateUrl: './create-village.component.html',
  styleUrls: ['./create-village.component.css']
})
export class CreateVillageComponent implements OnInit, OnDestroy {
  // talukas$: Observable<Taluka[]>;
  trackByItem = trackByKeyValue;
  districts: District[];
  talukas: Taluka[];
  getTalukasByDistrictIdSubscription: Subscription;
  getVillagesByTalukaIdSubscription: Subscription;
  getDistrictsAndLoadTypesSubscription: Subscription;
  appRoot$: Observable<AppRoot>;
  talukas$: Observable<Village[]>;
  formState$: Observable<FormGroupState<VillageFormState>>;
  constructor(private service: SharedDataService,
              private store: Store<DataConfigurationRootState>) {
                this.appRoot$ = store.select(p => p.portfolio);
                this.talukas$ = store.select(p => p.dataConfiguration.village.talukas);
                this.formState$ = store.select(p => p.dataConfiguration.village.formState);
               }

  ngOnDestroy(): void {
    // this.getDistrictsAndLoadTypesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    // this.getDistrictsAndLoadTypesSubscription = this.service.getDistrictsAndLoadTypes()
    // .subscribe(p => {
    //   this.districts = p.districts;
    // });
  }

  getTalukasByDistrictId(event) {
    this.store.dispatch(new LoadTalukasByDistrictAction(event.target.value));
  }

  clearForm() {
    this.store.dispatch(new ResetVillageFormAction());
  }

  createVillage() {
    this.store.dispatch(new CreateVillageAction());
  }
}
