import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../authentication/auth.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../shared/user/user';
import { environment } from 'src/environments/environment';
import { SaveUserDetailsAction } from '../../shared/user/user.actions';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  credentialsValid = false;
  year: number;
  messageText = '';

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private http: HttpClient,
              private store: Store<{user: User}>,) { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.loginForm = this.formBuilder.group({
      username : ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const self = this;
    this.authService.login(this.loginForm.value, (res: boolean) => {
        self.credentialsValid = res;
        self.spinner.hide();
        if (!res) {
          self.messageText = 'Username or password is invalid';
          return;
        }

        this.http.get<User>(environment.apiBaseUrl + 'contextapi/user/' + this.authService.getUsername)
        .subscribe(p => {
          this.store.dispatch(new SaveUserDetailsAction(p));
        });

        self.router.navigate(['portfolio/block-user']);
    },
    () => {
      self.messageText = 'An error occured. Try again later.';
      self.spinner.hide();
    });
    this.spinner.show();
    //this.credentialsValid = this.authService.isLoggedIn();
  }

}
