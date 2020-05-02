import {Routes, RouterModule} from '@angular/router';
import { RegisterCustomerComponent } from './customer/register-customer/register-customer.component';
import { NgModule } from '@angular/core';
import { PortfolioComponent } from './portfolio.component';
import { ViewCustomerComponent } from './customer/view-customer/view-customer.component';
import { CreateVillageComponent } from './village/create-village/create-village.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CreateStationComponent } from './station/create-station/create-station.component';
import { CreateSectionComponent } from './section/create-section/create-section.component';

const routes: Routes = [
    { path: 'home', component: PortfolioComponent,
      children: [
            { path: 'register-customer', component: RegisterCustomerComponent },
            { path: 'view-customer', component: ViewCustomerComponent },
            { path: 'create-village', component: CreateVillageComponent },
            { path: 'create-station', component: CreateStationComponent },
            { path: 'create-section', component: CreateSectionComponent }
      ]
    }
];

@NgModule({
    imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(routes)],
    exports: [ RouterModule ],
    declarations: [
      ViewCustomerComponent,
      CreateVillageComponent,
      RegisterCustomerComponent,
      CreateStationComponent,
      CreateSectionComponent]
})

export class PortfolioRoutingModule { }