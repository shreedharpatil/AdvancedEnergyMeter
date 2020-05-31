import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthService } from '../../login/authentication/auth.service';
import { environment } from 'src/environments/environment';
import { User } from '../../shared/user/user';
import { SaveUserDetailsAction } from '../../shared/user/user.actions';
import { LoadCustomersAction } from './customer/customer.actions';
import * as signalR from '@aspnet/signalr';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  private hubConnection: signalR.HubConnection;

  constructor(private http: HttpClient,
              private store: Store<{user: User}>,
              private authService: AuthService,
              private notification: NotificationService) { }

  ngOnInit(): void {
    this.http.get<User>(environment.apiBaseUrl + 'contextapi/user/' + this.authService.getUsername)
    .subscribe(p => {
      this.store.dispatch(new SaveUserDetailsAction(p));
    });

    this.store.dispatch(new LoadCustomersAction());
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(environment.apiBaseUrl + 'aem')
                            .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('eventReceived', (data) => {
      console.log(data);
      this.notification.showInfo(`${data.payload}`, 'Event Received');
    });
  }

}
