import { Routes, RouterModule } from '@angular/router';
import { BlockUserComponent } from './block-user/block-user.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { EffectsModule } from '@ngrx/effects';
import { PortfolioEffects } from './portfolio.effects';
import { SharedDataEffects } from '../../shared/shared.data.effects';
import { HttpHelperEffects } from '../../shared/http/http-helper-effects';
import { SpinnerEffects } from '../../shared/spinner/spinner-effects';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PortfolioMenusComponent } from './portfolio.menus/portfolio.menus.component';
import { PortfolioComponent } from './portfolio.component';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  { path: 'portfolio',
    component: PortfolioComponent,
    children: [
      { path: 'block-user', component: BlockUserComponent }
    ]}
];

@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot(),
    EffectsModule.forRoot([PortfolioEffects, SharedDataEffects, HttpHelperEffects, SpinnerEffects]),
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    BlockUserComponent,
    PortfolioMenusComponent,
    PortfolioComponent,
    ]
})

export class PortfolioRoutingModule { }