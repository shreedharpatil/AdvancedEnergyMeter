import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/aem/shared/user/user';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

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
