import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/aem/shared/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  customers$: Observable<Customer[]>;
  constructor(private http: HttpClient, private store: Store<{ customer: { customers: Customer[]}}>) { }

  ngOnInit(): void {
    this.customers$ = this.store.select(p => p.customer.customers);
  }
}
