import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './aem/login/login/login.component';
import { PortfolioComponent } from './aem/portfolio/portfolio/portfolio.component';
import { RegisterCustomerComponent } from './aem/portfolio/portfolio/customer/register-customer/register-customer.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: PortfolioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
