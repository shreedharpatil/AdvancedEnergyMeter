import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { District, AppRoot, Taluka, Village } from 'src/app/aem/shared/models';
import { Store } from '@ngrx/store';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateStationAction } from '../../../portfolio/portfolio.actions';

@Component({
  selector: 'app-create-station',
  templateUrl: './create-station.component.html',
  styleUrls: ['./create-station.component.css']
})
export class CreateStationComponent implements OnInit, OnDestroy {

  station: any = { name: '', districtId: 0, talukaId: 0, villageId: 0 };
  talukas: Taluka[];
  districts: District[];
  villages: Village[];
  createStationForm: FormGroup;
  isSubmitted = false;
  getTalukasByDistrictIdSubscription: Subscription;
  getVillagesByTalukaIdSubscription: Subscription;
  getDistrictsAndLoadTypesSubscription: Subscription;

  constructor(private service: SharedDataService,
              private formBuilder: FormBuilder,
              private store: Store<AppRoot>) { }

  ngOnDestroy(): void {
    this.getDistrictsAndLoadTypesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.createStationForm = this.formBuilder.group({
      stationName : ['', Validators.required],
      district: ['', Validators.pattern('^[1-9]\d*$')],
      taluka: ['', Validators.pattern('^[1-9]\d*$')],
      village: ['', Validators.pattern('^[1-9]\d*$')]
    });

    this.getDistrictsAndLoadTypesSubscription = this.service.getDistrictsAndLoadTypes()
    .subscribe(p => {
      this.districts = p.districts;
    });
  }

  get formControls() {
    return this.createStationForm.controls;
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

  clearForm() {
    this.station = { name: '', districtId: 0, talukaId: 0, villageId: 0 };
    this.isSubmitted = false;
  }

  createStation() {
    this.isSubmitted = true;
    if (this.createStationForm.invalid) {
      return;
    }

    this.station.districtId = parseInt(this.station.districtId);
    this.station.talukaId = parseInt(this.station.talukaId);
    this.station.villageId = parseInt(this.station.villageId);
    this.store.dispatch(new CreateStationAction(this.station));
  }
}
