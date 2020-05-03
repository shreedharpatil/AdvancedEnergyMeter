import { Injectable } from '@angular/core';
import { User } from '../../shared/user/user';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn = false;
  private username: string;
  constructor(private http: HttpClient) { }

  public login(user: User, callback: any) {
    const header = {'content-type' : 'application/json', 'Access-Control-Allow-Origin' : '*'};
    this.http.post(environment.apiBaseUrl + 'contextapi/user/validatecredentials', user, {headers : header})
    .subscribe(res => {
      console.log(res);
      this.isUserLoggedIn = res as boolean;
      this.username = user.username;
      callback(res);
    });
  }

  public isLoggedIn() {
    return this.isUserLoggedIn;
  }

  get getUsername() {
    return this.username;
  }

  public logout() {
    this.isUserLoggedIn = false;
  }
}
