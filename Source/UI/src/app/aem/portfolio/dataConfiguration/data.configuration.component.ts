import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../shared/user/user';
import { LoadCustomersAction } from './customer/customer.actions';

@Component({
  selector: 'app-data.configuration',
  templateUrl: './data.configuration.component.html',
  styleUrls: ['./data.configuration.component.css']
})
export class DataConfigurationComponent implements OnInit {

  constructor(
    private store: Store<{user: User}>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadCustomersAction());
  }

}
