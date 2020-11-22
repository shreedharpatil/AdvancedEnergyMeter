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
import { EffectsModule } from '@ngrx/effects';
import { PortfolioEffects } from './aem/portfolio/portfolio/portfolio.effects';
import { SharedDataEffects } from './aem/shared/shared.data.effects';
import { HttpHelperEffects } from './aem/shared/http/http-helper-effects';
import { SpinnerEffects } from './aem/shared/spinner/spinner-effects';
import { NgrxFormsModule } from 'ngrx-forms';
import { VillageReducer } from './aem/portfolio/dataConfiguration/village/village.reducer';
import { StationReducer } from './aem/portfolio/dataConfiguration/station/station.reducer';
import { SectionReducer } from './aem/portfolio/dataConfiguration/section/section.reducer';
import { FeederReducer } from './aem/portfolio/dataConfiguration/feeder/feeder.reducer';
import { TransformerReducer } from './aem/portfolio/dataConfiguration/transformer/transformer.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ portfolio: PortfolioReducer,
      user: UserReducer,
      customer: CustomerReducer,
      village: VillageReducer,
      station: StationReducer,
      section: SectionReducer,
      feeder: FeederReducer,
      transformer: TransformerReducer,
    }),
    NgrxFormsModule,
    EffectsModule.forRoot([PortfolioEffects,
      SharedDataEffects,
      HttpHelperEffects,
      SpinnerEffects,
    ]),
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
