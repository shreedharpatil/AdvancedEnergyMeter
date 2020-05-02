import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs';
import { District, AppRoot, LoadType, Taluka, Village, Station } from 'src/app/aem/shared/models';
import { Store, select } from '@ngrx/store';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.css']
})
export class CreateSectionComponent implements OnInit {
  section: any = { name: '', districtId: 0, talukaId: 0, villageId: 0, stationId: 0 };
  talukas: Taluka[];
  districts: District[];
  villages: Village[];
  stations: Station[];
  createSectionForm: FormGroup;
  isSubmitted = false;
  getTalukasByDistrictIdSubscription: Subscription;
  getVillagesByTalukaIdSubscription: Subscription;
  getDistrictsAndLoadTypesSubscription: Subscription;
  getStationsByVillageIdSubscription: Subscription;

  constructor(private service: SharedDataService, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnDestroy(): void {
    this.getDistrictsAndLoadTypesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.createSectionForm = this.formBuilder.group({
      sectionName : ['', Validators.required],
      district: ['', Validators.pattern('^[1-9]\d*$')],
      taluka: ['', Validators.pattern('^[1-9]\d*$')],
      village: ['', Validators.pattern('^[1-9]\d*$')],
      station: ['', Validators.pattern('^[1-9]\d*$')]
    });

    this.getDistrictsAndLoadTypesSubscription = this.service.getDistrictsAndLoadTypes()
    .subscribe(p => {
      this.districts = p.districts;
    });
  }

  get formControls() {
    return this.createSectionForm.controls;
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
      console.log(p);
      this.getStationsByVillageIdSubscription.unsubscribe();
    });
  }

  createStation() {
    this.isSubmitted = true;
    if (this.createSectionForm.invalid) {
      return;
    }

    this.section.stationId = parseInt(this.section.stationId);
    this.http.post(environment.apiBaseUrl + 'contextapi/section', this.section)
    .subscribe(p => {
      console.log(p);
      alert('Section created successfully');
    },
    error => alert(error.error));
  }
}
