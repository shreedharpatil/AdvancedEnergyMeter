import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { District, AppRoot, LoadType, Taluka, Village, Station, Section } from 'src/app/aem/shared/models';
import { Store } from '@ngrx/store';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateFeederAction } from '../../portfolio.actions';

@Component({
  selector: 'app-create-feeder',
  templateUrl: './create-feeder.component.html',
  styleUrls: ['./create-feeder.component.css']
})
export class CreateFeederComponent implements OnInit, OnDestroy {

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

  constructor(private service: SharedDataService,
              private formBuilder: FormBuilder,
              private store: Store<AppRoot>) { }

  ngOnDestroy(): void {
    this.getDistrictsAndLoadTypesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.createFeederForm = this.formBuilder.group({
      feederName: ['', Validators.required],
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
    this.store.dispatch(new CreateFeederAction(this.feeder));
  }
}
