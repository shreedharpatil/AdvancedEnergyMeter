import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthService } from '../../login/authentication/auth.service';
import { environment } from 'src/environments/environment';
import { User } from '../../shared/user/user';
import { SaveUserDetailsAction } from '../../shared/user/user.actions';
import { LoadCustomersAction } from './customer/customer.actions';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(private http: HttpClient,
              private store: Store<{user: User}>,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.http.get<User>(environment.apiBaseUrl + 'contextapi/user/' + this.authService.getUsername)
    .subscribe(p => {
      this.store.dispatch(new SaveUserDetailsAction(p));
    });

    this.store.dispatch(new LoadCustomersAction());
  }

}
