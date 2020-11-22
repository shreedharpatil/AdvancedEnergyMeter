import { Routes, RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { EffectsModule } from '@ngrx/effects';
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
import { DataConfigurationMenusComponent } from './data.configuration.menus/data.configuration.menus.component';
import { SharedModule } from '../shared/shared.module';
import { NgrxFormsModule } from 'ngrx-forms';
import { VillageEffects } from './village/village.effects';
import { CustomerEffects } from './customer/customer.effects';
import { FeederEffects } from './feeder/feeder.effects';
import { SectionEffects } from './section/section.effects';
import { StationEffects } from './station/station.effects';
import { TransformerEffects } from './transformer/transformer.effects';
import { StoreModule } from '@ngrx/store';
import { DATA_CONFIGURATION_FEATURE_NAME, DataConfigurationReducer } from './data.configuration.reducer';

const routes: Routes = [
    // { path: '', redirectTo: 'home-landing'},
    { path: '', component: DataConfigurationComponent, children: [
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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot(),
    StoreModule.forFeature(DATA_CONFIGURATION_FEATURE_NAME, DataConfigurationReducer),
    EffectsModule.forFeature([
      VillageEffects,
      StationEffects,
      SectionEffects,
      FeederEffects,
      TransformerEffects,
      CustomerEffects,]),
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
