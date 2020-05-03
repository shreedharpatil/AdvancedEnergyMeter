import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/aem/shared/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  customers: Customer[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadAllCustomers();
  }

  loadAllCustomers() {
    this.http.get<Customer[]>(environment.apiBaseUrl + 'contextapi/customer').subscribe(p => {
      this.customers = p;
    });
  }
}
