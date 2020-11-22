import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './aem/login/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedDataService } from './aem/shared/shared-data.service';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EffectsModule } from '@ngrx/effects';
import { SharedDataEffects } from './aem/shared/shared.data.effects';
import { HttpHelperEffects } from './aem/shared/http/http-helper-effects';
import { SpinnerEffects } from './aem/shared/spinner/spinner-effects';
import { NgrxFormsModule } from 'ngrx-forms';
import { reducers } from './app.state';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    NgrxFormsModule,
    EffectsModule.forRoot([
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
