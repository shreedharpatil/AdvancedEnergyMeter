import { Routes, RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { EffectsModule } from '@ngrx/effects';
import { SharedDataEffects } from 'src/app/aem/shared/shared.data.effects';
import { HttpHelperEffects } from 'src/app/aem/shared/http/http-helper-effects';
import { SpinnerEffects } from 'src/app/aem/shared/spinner/spinner-effects';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { DataConfigurationComponent } from './data.configuration.component';
import { ViewCustomerComponent } from './customer/view-customer/view-customer.component';
import { RegisterCustomerComponent } from './customer/register-customer/register-customer.component';
import { CreateVillageComponent } from './village/create-village/create-village.component';
import { CreateStationComponent } from './station/create-station/create-station.component';
import { CreateSectionComponent } from './section/create-section/create-section.component';
import { CreateFeederComponent } from './feeder/create-feeder/create-feeder.component';
import { CreateTransformerComponent } from './transformer/create-transformer/create-transformer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortfolioEffects } from '../portfolio/portfolio.effects';
import { DataConfigurationMenusComponent } from './data.configuration.menus/data.configuration.menus.component';
import { SharedModule } from '../shared/shared.module';
import { NgrxFormsModule } from 'ngrx-forms';
import { VillageEffects } from './village/village.effects';

const routes: Routes = [
    // { path: '', redirectTo: 'home-landing'},
    { path: 'configureData', component: DataConfigurationComponent, children: [
      { path: 'home-landing', component: ViewCustomerComponent },
      { path: 'register-customer', component: RegisterCustomerComponent },
      { path: 'view-customer', component: ViewCustomerComponent },
      { path: 'create-village', component: CreateVillageComponent },
      { path: 'create-station', component: CreateStationComponent },
      { path: 'create-section', component: CreateSectionComponent },
      { path: 'create-feeder', component: CreateFeederComponent },
      { path: 'create-transformer', component: CreateTransformerComponent }
    ]}
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot(),
    EffectsModule.forFeature([PortfolioEffects, SharedDataEffects, HttpHelperEffects, SpinnerEffects, VillageEffects]),
    NgxSpinnerModule,
    NgrxFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ViewCustomerComponent,
    CreateVillageComponent,
    RegisterCustomerComponent,
    CreateStationComponent,
    CreateSectionComponent,
    CreateFeederComponent,
    CreateTransformerComponent,
    DataConfigurationMenusComponent,
    DataConfigurationComponent,
    ]
})

export class DataConfigurationRoutingModule { }
