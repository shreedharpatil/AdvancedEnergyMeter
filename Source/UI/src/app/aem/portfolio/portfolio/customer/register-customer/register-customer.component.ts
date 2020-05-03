import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs';
import { District, AppRoot, LoadType, Taluka, Village, Station, Section, Feeder, Transformer, Customer } from 'src/app/aem/shared/models';
import { Store, select } from '@ngrx/store';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/aem/shared/notification.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit, OnDestroy {

  customer: Customer = new Customer();
  talukas: Taluka[];
  districts: District[];
  loadTypes: LoadType[];
  villages: Village[];
  stations: Station[];
  sections: Section[];
  feeders: Feeder[];
  transformers: Transformer[];
  registerCustomerForm: FormGroup;
  isSubmitted = false;
  getTalukasByDistrictIdSubscription: Subscription;
  getVillagesByTalukaIdSubscription: Subscription;
  getDistrictsAndLoadTypesSubscription: Subscription;
  getStationsByVillageIdSubscription: Subscription;
  getSectionsByStationIdSubscription: Subscription;
  getFeedersBySectionIdSubscription: Subscription;
  getTransformerByFeederIdSubscription: Subscription;

  constructor(private service: SharedDataService, 
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private notification: NotificationService) { }

  ngOnDestroy(): void {
    this.getDistrictsAndLoadTypesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.registerCustomerForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      rrNumber : ['', Validators.required],
      loadType: ['', [Validators.required, Validators.pattern('^[1-9]\d*$')]],
      district: ['', [Validators.required, Validators.pattern('^[1-9]\d*$')]],
      taluka: ['', [Validators.required, Validators.pattern('^[1-9]\d*$')]],
      village: ['', [Validators.required, Validators.pattern('^[1-9]\d*$')]],
      station: ['', [Validators.required, Validators.pattern('^[1-9]\d*$')]],
      section: ['', [Validators.required, Validators.pattern('^[1-9]\d*$')]],
      feeder: ['', [Validators.required, Validators.pattern('^[1-9]\d*$')]],
      transformer: ['', [Validators.required, Validators.pattern('^[1-9]\d*$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });

    this.getDistrictsAndLoadTypesSubscription = this.service.getDistrictsAndLoadTypes()
    .subscribe(p => {
      this.districts = p.districts;
      this.loadTypes = p.loadTypes;
    });
  }

  get formControls() {
    return this.registerCustomerForm.controls;
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

  getFeedersBySectionId(event) {
    this.getFeedersBySectionIdSubscription = this.service.getFeedersBySectionId(event.target.value)
    .subscribe(p => {
      this.feeders = p;
      this.getFeedersBySectionIdSubscription.unsubscribe();
    });
  }

  getTransformersByFeederId(event) {
    this.getTransformerByFeederIdSubscription = this.service.getTransformersByFeederId(event.target.value)
    .subscribe(p => {
      this.transformers = p as Transformer[];
      this.getTransformerByFeederIdSubscription.unsubscribe();
    });
  }

  clearForm() {
        this.customer.rrNumber = '';
        this.customer.firstName = '';
        this.customer.lastName = '';
        this.customer.loadTypeId = 0;
        this.customer.districtId = 0;
        this.customer.talukaId = 0;
        this.customer.villageId = 0;
        this.customer.stationId = 0;
        this.customer.sectionId = 0;
        this.customer.feederId = 0;
        this.customer.transformerId = 0;
        this.customer.mobileNumber = '';
        this.isSubmitted = false;
  }

  registerCustomer() {
    this.isSubmitted = true;
    if (this.registerCustomerForm.invalid) {
      return;
    }

    this.customer.loadTypeId = parseInt(this.customer.loadTypeId.toString());
    this.customer.transformerId = parseInt(this.customer.transformerId.toString());
    this.customer.villageId = parseInt(this.customer.villageId.toString());

    this.http.post(environment.apiBaseUrl + 'contextapi/customer', this.customer)
    .subscribe(p => {
      this.notification.showSuccess('Customer created successfully', 'Register Customer');
      this.clearForm();
    },
    error => this.notification.showSuccess(error.error, 'Register Customer'));
  }
}
