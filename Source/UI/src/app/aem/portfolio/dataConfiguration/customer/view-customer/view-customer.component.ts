import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/aem/shared/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataConfigurationRootState } from '../../data.configuration.reducer';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  customers$: Observable<Customer[]>;
  constructor(private store: Store<DataConfigurationRootState>) { }

  ngOnInit(): void {
    this.customers$ = this.store.select(p => p.dataConfiguration.customer.customers);
  }
}
