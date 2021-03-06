import { Injectable } from '@angular/core';
import { User } from '../../shared/user/user';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn = false;
  private username: string;
  constructor(private http: HttpClient) { }

  public login(user: User, success: any, error: any) {
    const header = {'content-type' : 'application/json', 'Access-Control-Allow-Origin' : '*'};
    this.http.post(environment.apiBaseUrl + 'contextapi/user/validatecredentials', user, {headers : header})
    .subscribe(res => {
      this.isUserLoggedIn = res as boolean;
      this.username = user.username;
      success(res);
    },
    err => error()
    );
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
