import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn:boolean = false;

  constructor(private http: HttpClient) { }

  public login(user:User, callback:any){
    var header = {'content-type' : 'application/json', 'Access-Control-Allow-Origin' : "*"};
    this.http.post(environment.apiBaseUrl + "contextapi/user/validatecredentials", user, {headers : header})
    .subscribe(res => { 
      console.log(res);
      this.isUserLoggedIn = res;
      callback(res);
    });
  }

  public isLoggedIn(){
    return this.isUserLoggedIn;
  }

  public logout(){
    this.isUserLoggedIn = false;
  }
}
