import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { District, AppRoot, Taluka, Village, Station } from 'src/app/aem/shared/models';
import { Store } from '@ngrx/store';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateSectionAction } from '../../../portfolio/portfolio.actions';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.css']
})
export class CreateSectionComponent implements OnInit, OnDestroy {
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

  constructor(private service: SharedDataService,
              private formBuilder: FormBuilder,
              private store: Store<AppRoot>) { }

  ngOnDestroy(): void {
    this.getDistrictsAndLoadTypesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.createSectionForm = this.formBuilder.group({
      sectionName: ['', Validators.required],
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
        this.getStationsByVillageIdSubscription.unsubscribe();
      });
  }

  clearForm() {
    this.section = { name: '', districtId: 0, talukaId: 0, villageId: 0, stationId: 0 };
    this.isSubmitted = false;
  }

  createStation() {
    this.isSubmitted = true;
    if (this.createSectionForm.invalid) {
      return;
    }

    this.section.stationId = parseInt(this.section.stationId);
    this.store.dispatch(new CreateSectionAction(this.section));
  }
}
