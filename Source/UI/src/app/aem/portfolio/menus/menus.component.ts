import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { User } from '../../shared/user/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit, OnDestroy {

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
