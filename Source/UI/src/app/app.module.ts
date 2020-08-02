import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './aem/login/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedDataService } from './aem/shared/shared-data.service';
import { StoreModule } from '@ngrx/store';
import { PortfolioReducer } from './aem/portfolio/portfolio/portfolio.reducer';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserReducer } from './aem/shared/user/user.reducer';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomerReducer } from './aem/portfolio/dataConfiguration/customer/customer.reducer';
import { DataConfigurationRoutingModule } from './aem/portfolio/dataConfiguration/data.configuration.routing.module';
import { PortfolioRoutingModule } from './aem/portfolio/portfolio/portfolio.routing.module';
import { EffectsModule } from '@ngrx/effects';
import { PortfolioEffects } from './aem/portfolio/portfolio/portfolio.effects';
import { SharedDataEffects } from './aem/shared/shared.data.effects';
import { HttpHelperEffects } from './aem/shared/http/http-helper-effects';
import { SpinnerEffects } from './aem/shared/spinner/spinner-effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ portfolio: PortfolioReducer, user: UserReducer, customer: CustomerReducer }),
    EffectsModule.forRoot([PortfolioEffects, SharedDataEffects, HttpHelperEffects, SpinnerEffects]),
    DataConfigurationRoutingModule,
    PortfolioRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [SharedDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
