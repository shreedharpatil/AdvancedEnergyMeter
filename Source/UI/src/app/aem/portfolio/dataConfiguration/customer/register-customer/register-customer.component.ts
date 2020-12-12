import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { District, LoadType, Taluka, Village, Station, Section, Feeder, Transformer, AppRoot } from 'src/app/aem/shared/models';
import { Store } from '@ngrx/store';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';
import { AddCustomerAction, ResetRegisterCustomerFormAction } from '../customer.actions';
import { CustomerFormValue } from '../customer.state';
import { FormGroupState } from 'ngrx-forms';
import { DataConfigurationRootState } from '../../data.configuration.reducer';
import { LoadFeedersBySectionAction } from '../../feeder/feeder.actions';
import { LoadSectionsByStationAction } from '../../section/section.actions';
import { LoadStationsByVillageAction } from '../../station/station.actions';
import { LoadTransformersByFeederAction } from '../../transformer/transformer.actions';
import { LoadTalukasByDistrictAction, LoadVillagesByTalukaAction } from '../../village/village.actions';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit, OnDestroy {

  customerSubscription: Subscription;
  talukas: Taluka[];
  districts: District[];
  loadTypes: LoadType[];
  villages: Village[];
  stations: Station[];
  sections: Section[];
  feeders: Feeder[];
  transformers: Transformer[];
  getTalukasByDistrictIdSubscription: Subscription;
  getVillagesByTalukaIdSubscription: Subscription;
  getDistrictsAndLoadTypesSubscription: Subscription;
  getStationsByVillageIdSubscription: Subscription;
  getSectionsByStationIdSubscription: Subscription;
  getFeedersBySectionIdSubscription: Subscription;
  getTransformerByFeederIdSubscription: Subscription;
  appRoot$: Observable<AppRoot>;
  formState$: Observable<FormGroupState<CustomerFormValue>>;

  constructor(private service: SharedDataService,
              private store: Store<DataConfigurationRootState>) {
                this.appRoot$ = store.select(p => p.portfolio);
                this.formState$ = store.select(p => p.dataConfiguration.customer.formState);
              }

  ngOnDestroy(): void {
    // this.getDistrictsAndLoadTypesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    // this.getDistrictsAndLoadTypesSubscription = this.service.getDistrictsAndLoadTypes()
    //   .subscribe(p => {
    //     this.districts = p.districts;
    //     this.loadTypes = p.loadTypes;
    //   });
  }

  getTalukasByDistrictId(event) {
    this.store.dispatch(new LoadTalukasByDistrictAction(event.target.value));
    // this.getTalukasByDistrictIdSubscription = this.service.getTalukasByDistrictId(event.target.value)
    //   .subscribe(p => {
    //     this.talukas = p;
    //     this.getTalukasByDistrictIdSubscription.unsubscribe();
    //   });
  }

  getVillagesByTalukaId(event) {
    this.store.dispatch(new LoadVillagesByTalukaAction(event.target.value));
    // this.getVillagesByTalukaIdSubscription = this.service.getVillagesByTalukaId(event.target.value)
    //   .subscribe(p => {
    //     this.villages = p;
    //     this.getVillagesByTalukaIdSubscription.unsubscribe();
    //   });
  }

  getStationsByVillageId(event) {
    this.store.dispatch(new LoadStationsByVillageAction(event.target.value));
    // this.getStationsByVillageIdSubscription = this.service.getStationsByVillageId(event.target.value)
    //   .subscribe(p => {
    //     this.stations = p;
    //     this.getStationsByVillageIdSubscription.unsubscribe();
    //   });
  }

  getSectionsByStationId(event) {
    this.store.dispatch(new LoadSectionsByStationAction(event.target.value));
    // this.getSectionsByStationIdSubscription = this.service.getSectionsByStationId(event.target.value)
    //   .subscribe(p => {
    //     this.sections = p;
    //     this.getSectionsByStationIdSubscription.unsubscribe();
    //   });
  }

  getFeedersBySectionId(event) {
    this.store.dispatch(new LoadFeedersBySectionAction(event.target.value));
    // this.getFeedersBySectionIdSubscription = this.service.getFeedersBySectionId(event.target.value)
    //   .subscribe(p => {
    //     this.feeders = p;
    //     this.getFeedersBySectionIdSubscription.unsubscribe();
    //   });
  }

  getTransformersByFeederId(event) {
    this.store.dispatch(new LoadTransformersByFeederAction(event.target.value));
    // this.getTransformerByFeederIdSubscription = this.service.getTransformersByFeederId(event.target.value)
    //   .subscribe(p => {
    //     this.transformers = p as Transformer[];
    //     this.getTransformerByFeederIdSubscription.unsubscribe();
    //   });
  }

  clearForm() {
    this.store.dispatch(new ResetRegisterCustomerFormAction());
  }

  registerCustomer() {
    this.store.dispatch(new AddCustomerAction());
  }
}
