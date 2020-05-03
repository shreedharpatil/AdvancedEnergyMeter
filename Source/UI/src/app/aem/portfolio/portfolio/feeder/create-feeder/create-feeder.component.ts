import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs';
import { District, AppRoot, LoadType, Taluka, Village, Station, Section, SaveStation } from 'src/app/aem/shared/models';
import { Store, select } from '@ngrx/store';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/aem/shared/notification.service';

@Component({
  selector: 'app-create-feeder',
  templateUrl: './create-feeder.component.html',
  styleUrls: ['./create-feeder.component.css']
})
export class CreateFeederComponent implements OnInit, OnDestroy{

  feeder: any = { name: '', districtId: 0, talukaId: 0, villageId: 0, stationId: 0, sectionId: 0 };
  talukas: Taluka[];
  districts: District[];
  villages: Village[];
  stations: Station[];
  sections: Section[];
  createFeederForm: FormGroup;
  isSubmitted = false;
  getTalukasByDistrictIdSubscription: Subscription;
  getVillagesByTalukaIdSubscription: Subscription;
  getDistrictsAndLoadTypesSubscription: Subscription;
  getStationsByVillageIdSubscription: Subscription;
  getSectionsByStationIdSubscription: Subscription;

  constructor(private service: SharedDataService, private http: HttpClient, private formBuilder: FormBuilder,
              private notification: NotificationService) { }

  ngOnDestroy(): void {
    this.getDistrictsAndLoadTypesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.createFeederForm = this.formBuilder.group({
      feederName : ['', Validators.required],
      district: ['', Validators.pattern('^[1-9]\d*$')],
      taluka: ['', Validators.pattern('^[1-9]\d*$')],
      village: ['', Validators.pattern('^[1-9]\d*$')],
      station: ['', Validators.pattern('^[1-9]\d*$')],
      section: ['', Validators.pattern('^[1-9]\d*$')]
    });

    this.getDistrictsAndLoadTypesSubscription = this.service.getDistrictsAndLoadTypes()
    .subscribe(p => {
      this.districts = p.districts;
    });
  }

  get formControls() {
    return this.createFeederForm.controls;
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

  getSectionsByStationId(event) {
    this.getSectionsByStationIdSubscription = this.service.getSectionsByStationId(event.target.value)
    .subscribe(p => {
      this.sections = p;
      this.getSectionsByStationIdSubscription.unsubscribe();
    });
  }

  clearForm() {
    this.feeder = { name: '', districtId: 0, talukaId: 0, villageId: 0, stationId: 0, sectionId: 0 };
    this.isSubmitted = false;
  }

  createFeeder() {
    this.isSubmitted = true;
    if (this.createFeederForm.invalid) {
      return;
    }

    this.feeder.sectionId = parseInt(this.feeder.sectionId);
    this.http.post(environment.apiBaseUrl + 'contextapi/feeder', this.feeder)
    .subscribe(p => {
      this.notification.showSuccess('Feeder created successfully', 'Create Feeder');
      this.clearForm();
    },
    error => this.notification.showError(error.error, 'Create Feeder'));
  }

}
