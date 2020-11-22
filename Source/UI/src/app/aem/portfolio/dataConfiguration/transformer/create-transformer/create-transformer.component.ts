import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { District, Taluka, Village, Station, Section, Feeder } from 'src/app/aem/shared/models';
import { Store } from '@ngrx/store';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';
import { TransformerFormValue } from '../transformer.state';
import { FormGroupState } from 'ngrx-forms';
import { CreateTransformerAction, ResetTransformerFormAction } from '../transformer.actions';
import { DataConfigurationRootState } from '../../data.configuration.reducer';

@Component({
  selector: 'app-create-transformer',
  templateUrl: './create-transformer.component.html',
  styleUrls: ['./create-transformer.component.css']
})
export class CreateTransformerComponent implements OnInit, OnDestroy {
  talukas: Taluka[];
  districts: District[];
  villages: Village[];
  stations: Station[];
  sections: Section[];
  feeders: Feeder[];
  getTalukasByDistrictIdSubscription: Subscription;
  getVillagesByTalukaIdSubscription: Subscription;
  getDistrictsAndLoadTypesSubscription: Subscription;
  getStationsByVillageIdSubscription: Subscription;
  getSectionsByStationIdSubscription: Subscription;
  getFeedersBySectionIdSubscription: Subscription;
  formState$: Observable<FormGroupState<TransformerFormValue>>;

  constructor(private service: SharedDataService,
              private store: Store<DataConfigurationRootState>) {
                this.formState$ = store.select(p => p.dataConfiguration.transformer.formState);
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
    this.store.dispatch(new ResetTransformerFormAction());
  }

  createTransformer() {
    this.store.dispatch(new CreateTransformerAction());
  }
}
