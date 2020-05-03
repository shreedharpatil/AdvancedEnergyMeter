import { Component, OnInit, OnDestroy } from '@angular/core';
import { District, Taluka } from 'src/app/aem/shared/models';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/aem/shared/notification.service';

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

  constructor(private service: SharedDataService, private http: HttpClient, private formBuilder: FormBuilder,
              private notification: NotificationService) { }

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
    this.http.post(environment.apiBaseUrl + 'contextapi/village', this.village)
    .subscribe(p => {
      this.notification.showSuccess('Village created successfully', 'Create Village');
      this.clearForm();
    },
    error => this.notification.showError(error.error, 'Create Village'));
  }
}
