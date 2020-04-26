import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../authentication/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted:boolean = false;
  credentialsValid:boolean = false;

  constructor(private authService:AuthService, private router:Router, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username : ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls(){
    return this.loginForm.controls;
  }

  login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    let self = this;
    this.authService.login(this.loginForm.value, function(res){
        self.credentialsValid = res;
    });
    //this.credentialsValid = this.authService.isLoggedIn();
  }

}
