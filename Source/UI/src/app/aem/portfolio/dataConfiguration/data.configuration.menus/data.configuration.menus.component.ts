import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/aem/shared/user/user';

@Component({
  selector: 'app-data-configuration-menus',
  templateUrl: './data.configuration.menus.component.html',
  styleUrls: ['./data.configuration.menus.component.css']
})
export class DataConfigurationMenusComponent implements OnInit, OnDestroy {

  user: User = new User();
  getUserSubscription: Subscription;

  constructor(private store: Store<{user: User}>) { }
  ngOnDestroy(): void {
    this.getUserSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getUserSubscription = this.store.pipe(select('user'))
    .subscribe(p => {
        this.user = p;
    });
  }
}
