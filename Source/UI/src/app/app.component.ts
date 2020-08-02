import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as signalR from '@aspnet/signalr';
import { NotificationService } from './aem/shared/notification.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthService } from './aem/login/authentication/auth.service';
import { User } from './aem/shared/user/user';
import { SaveUserDetailsAction } from './aem/shared/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private notification: NotificationService) {
  }
  private hubConnection: signalR.HubConnection;
  title = 'AEM';

  ngOnInit(): void {
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
