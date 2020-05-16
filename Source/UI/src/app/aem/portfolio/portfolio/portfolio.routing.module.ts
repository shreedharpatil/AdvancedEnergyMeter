import { Routes, RouterModule } from '@angular/router';
import { RegisterCustomerComponent } from './customer/register-customer/register-customer.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PortfolioComponent } from './portfolio.component';
import { ViewCustomerComponent } from './customer/view-customer/view-customer.component';
import { CreateVillageComponent } from './village/create-village/create-village.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CreateStationComponent } from './station/create-station/create-station.component';
import { CreateSectionComponent } from './section/create-section/create-section.component';
import { CreateFeederComponent } from './feeder/create-feeder/create-feeder.component';
import { CreateTransformerComponent } from './transformer/create-transformer/create-transformer.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from '../../login/authentication/auth.guard';
import { EffectsModule } from '@ngrx/effects';
import { PortfolioEffects } from './portfolio.effects';
import { SharedDataEffects } from '../../shared/shared.data.effects';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerEffects } from '../../shared/spinner/spinner-effects';
import { HttpHelperEffects } from '../../shared/http/http-helper-effects';

const routes: Routes = [
  {
    path: 'home', component: PortfolioComponent, canActivate: [AuthGuard],
    children: [
      { path: 'home-landing', component: ViewCustomerComponent },
      { path: 'register-customer', component: RegisterCustomerComponent },
      { path: 'view-customer', component: ViewCustomerComponent },
      { path: 'create-village', component: CreateVillageComponent },
      { path: 'create-station', component: CreateStationComponent },
      { path: 'create-section', component: CreateSectionComponent },
      { path: 'create-feeder', component: CreateFeederComponent },
      { path: 'create-transformer', component: CreateTransformerComponent }
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    EffectsModule.forRoot([PortfolioEffects, SharedDataEffects, HttpHelperEffects, SpinnerEffects]),
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
  declarations: [
    ViewCustomerComponent,
    CreateVillageComponent,
    RegisterCustomerComponent,
    CreateStationComponent,
    CreateSectionComponent,
    CreateFeederComponent,
    CreateTransformerComponent]
})

export class PortfolioRoutingModule { }