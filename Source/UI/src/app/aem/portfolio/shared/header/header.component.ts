import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/aem/login/authentication/auth.service';

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
    let rrno = $('#rrno').val();
    this.http.post(environment.apiBaseUrl + 'contextapi/sendcommand', { rrno, command: event.target.value})
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
