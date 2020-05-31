import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/authentication/auth.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  sendCommand(event) {
    this.http.post(environment.apiBaseUrl + 'contextapi/sendcommand', { command: event.target.value})
    .subscribe(p => console.log(p));
  }

  toggle() {
    $('.sidebar-toggle').toggleClass('active');

    $('#sidebar').toggleClass('shrinked');
    $('.page-content').toggleClass('active');
    $(document).trigger('sidebarChanged');

    if ($('.sidebar-toggle').hasClass('active')) {
            $('.navbar-brand .brand-sm').addClass('visible');
            $('.navbar-brand .brand-big').removeClass('visible');
            $('.sidebar-toggle').find('i').attr('class', 'oi oi-arrow-thick-right');
        } else {
            $('.navbar-brand .brand-sm').removeClass('visible');
            $('.navbar-brand .brand-big').addClass('visible');
            $('.sidebar-toggle').find('i').attr('class', 'oi oi-arrow-thick-left');
        }
  }
}
