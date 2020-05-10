import { Component, OnInit, OnDestroy } from '@angular/core';
import { District, Taluka, AppRoot } from 'src/app/aem/shared/models';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { CreateVillageAction } from '../../portfolio.actions';

@Component({
  selector: 'app-create-village',
  templateUrl: './create-village.component.html',
  styleUrls: ['./create-village.component.css']
})
export class CreateVillageComponent implements OnInit, OnDestroy {
  village: any = { name: '', districtId: 0, talukaId: 0 };
  districts: District[];
  talukas: Taluka[];
  createVillageForm: FormGroup;
  isSubmitted = false;
  getTalukasByDistrictIdSubscription: Subscription;
  getVillagesByTalukaIdSubscription: Subscription;
  getDistrictsAndLoadTypesSubscription: Subscription;

  constructor(private service: SharedDataService,
              private formBuilder: FormBuilder,
              private store: Store<AppRoot>) { }

  ngOnInit(): void {
    this.createVillageForm = this.formBuilder.group({
      villageName : ['', Validators.required],
      district: ['', Validators.pattern('^[1-9]\d*$')],
      taluka: ['', Validators.pattern('^[1-9]\d*$')]
    });

    this.getDistrictsAndLoadTypesSubscription = this.service.getDistrictsAndLoadTypes()
    .subscribe(p => {
      this.districts = p.districts;
    });
  }

  ngOnDestroy(): void {
    this.getDistrictsAndLoadTypesSubscription.unsubscribe();
  }

  get formControls() {
    return this.createVillageForm.controls;
  }

  getTalukasByDistrictId(event) {
    this.getTalukasByDistrictIdSubscription = this.service.getTalukasByDistrictId(event.target.value)
    .subscribe(p => {
      this.talukas = p;
      this.getTalukasByDistrictIdSubscription.unsubscribe();
    });
  }

  clearForm() {
    this.village = { name: '', districtId: 0, talukaId: 0 };
    this.isSubmitted = false;
  }

  createVillage() {
    this.isSubmitted = true;
    if (this.createVillageForm.invalid) {
      return;
    }

    this.village.talukaId = parseInt(this.village.talukaId);
    this.store.dispatch(new CreateVillageAction(this.village));
  }
}
