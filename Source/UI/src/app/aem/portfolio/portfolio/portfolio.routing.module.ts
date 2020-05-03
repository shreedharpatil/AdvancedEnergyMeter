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
import { CreateFeederComponent } from './feeder/create-feeder/create-feeder.component';
import { CreateTransformerComponent } from './transformer/create-transformer/create-transformer.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from '../../login/authentication/auth.guard';

const routes: Routes = [
    { path: 'home', component: PortfolioComponent, canActivate: [AuthGuard],
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
      ],
    exports: [ RouterModule ],
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