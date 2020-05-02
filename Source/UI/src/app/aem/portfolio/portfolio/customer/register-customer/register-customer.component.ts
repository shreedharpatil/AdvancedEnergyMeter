import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs';
import { District, AppRoot, LoadType, Taluka, Village } from 'src/app/aem/shared/models';
import { Store, select } from '@ngrx/store';
import { SharedDataService } from 'src/app/aem/shared/shared-data.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit, OnDestroy {

  talukas: Taluka[];
  districts: District[];
  loadTypes: LoadType[];
  villages: Village[];
  getTalukasByDistrictIdSubscription: Subscription;
  getVillagesByTalukaIdSubscription: Subscription;
  getDistrictsAndLoadTypesSubscription: Subscription;

  constructor(private service: SharedDataService) { }

  ngOnDestroy(): void {
    this.getDistrictsAndLoadTypesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getDistrictsAndLoadTypesSubscription = this.service.getDistrictsAndLoadTypes()
    .subscribe(p => {
      this.districts = p.districts;
      this.loadTypes = p.loadTypes;
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
}
