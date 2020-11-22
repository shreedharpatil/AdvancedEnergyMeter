import { Component, OnInit, OnDestroy } from '@angular/core';
import { District, Taluka } from 'src/app/aem/shared/models';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';

import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { VillageFormState } from '../village.state';
import { FormGroupState } from 'ngrx-forms';
import { CreateVillageAction, ResetVillageFormAction } from '../village.actions';
import { DataConfigurationRootState } from '../../data.configuration.reducer';

@Component({
  selector: 'app-create-village',
  templateUrl: './create-village.component.html',
  styleUrls: ['./create-village.component.css']
})
export class CreateVillageComponent implements OnInit, OnDestroy {
  talukas$: Observable<Taluka[]>;
  districts: District[];
  talukas: Taluka[];
  getTalukasByDistrictIdSubscription: Subscription;
  getVillagesByTalukaIdSubscription: Subscription;
  getDistrictsAndLoadTypesSubscription: Subscription;
  formState$: Observable<FormGroupState<VillageFormState>>;
  constructor(private service: SharedDataService,
              private store: Store<DataConfigurationRootState>) {
                this.formState$ = store.select(p => p.dataConfiguration.village.formState);
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
    this.talukas$ = this.service.getTalukasByDistrictId(event.target.value);
  }

  clearForm() {
    this.store.dispatch(new ResetVillageFormAction());
  }

  createVillage() {
    this.store.dispatch(new CreateVillageAction());
  }
}
