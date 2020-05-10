import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './aem/login/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PortfolioComponent } from './aem/portfolio/portfolio/portfolio.component';
import { HeaderComponent } from './aem/portfolio/header/header.component';
import { FooterComponent } from './aem/portfolio/footer/footer.component';
import { MenusComponent } from './aem/portfolio/menus/menus.component';
import { PortfolioRoutingModule } from '../app/aem/portfolio/portfolio/portfolio.routing.module';
import { SharedDataService } from './aem/shared/shared-data.service';
import { StoreModule } from '@ngrx/store';
import { PortfolioReducer } from './aem/portfolio/portfolio/portfolio.reducer';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserReducer } from './aem/shared/user/user.reducer';
import { CustomerReducer } from './aem/portfolio/portfolio/customer/customer.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PortfolioComponent,
    HeaderComponent,
    FooterComponent,
    MenusComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ portfolio: PortfolioReducer, user: UserReducer, customer: CustomerReducer }),
    AppRoutingModule,
    PortfolioRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [SharedDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
