import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { District, AppRoot, Taluka, Village, Station, Section, Feeder } from 'src/app/aem/shared/models';
import { Store } from '@ngrx/store';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateTransformerAction } from '../../portfolio.actions';

@Component({
  selector: 'app-create-transformer',
  templateUrl: './create-transformer.component.html',
  styleUrls: ['./create-transformer.component.css']
})
export class CreateTransformerComponent implements OnInit, OnDestroy {

  transformer: any = { name: '', districtId: 0, talukaId: 0, villageId: 0, stationId: 0, sectionId: 0, feederId: 0 };
  talukas: Taluka[];
  districts: District[];
  villages: Village[];
  stations: Station[];
  sections: Section[];
  feeders: Feeder[];
  createTransformerForm: FormGroup;
  isSubmitted = false;
  getTalukasByDistrictIdSubscription: Subscription;
  getVillagesByTalukaIdSubscription: Subscription;
  getDistrictsAndLoadTypesSubscription: Subscription;
  getStationsByVillageIdSubscription: Subscription;
  getSectionsByStationIdSubscription: Subscription;
  getFeedersBySectionIdSubscription: Subscription;

  constructor(private service: SharedDataService,
              private formBuilder: FormBuilder,
              private store: Store<AppRoot>) { }

  ngOnDestroy(): void {
    this.getDistrictsAndLoadTypesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.createTransformerForm = this.formBuilder.group({
      transformerName: ['', Validators.required],
      district: ['', Validators.pattern('^[1-9]\d*$')],
      taluka: ['', Validators.pattern('^[1-9]\d*$')],
      village: ['', Validators.pattern('^[1-9]\d*$')],
      station: ['', Validators.pattern('^[1-9]\d*$')],
      section: ['', Validators.pattern('^[1-9]\d*$')],
      feeder: ['', Validators.pattern('^[1-9]\d*$')]
    });

    this.getDistrictsAndLoadTypesSubscription = this.service.getDistrictsAndLoadTypes()
      .subscribe(p => {
        this.districts = p.districts;
      });
  }

  get formControls() {
    return this.createTransformerForm.controls;
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

  getFeedersBySectionId(event) {
    this.getFeedersBySectionIdSubscription = this.service.getFeedersBySectionId(event.target.value)
      .subscribe(p => {
        this.feeders = p;
        this.getFeedersBySectionIdSubscription.unsubscribe();
      });
  }

  clerForm() {
    this.transformer = { name: '', districtId: 0, talukaId: 0, villageId: 0, stationId: 0, sectionId: 0, feederId: 0 };
    this.isSubmitted = false;
  }

  createTransformer() {
    this.isSubmitted = true;
    if (this.createTransformerForm.invalid) {
      return;
    }

    this.transformer.feederId = parseInt(this.transformer.feederId);
    this.store.dispatch(new CreateTransformerAction(this.transformer));
  }
}
