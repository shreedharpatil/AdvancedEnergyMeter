import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './aem/login/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent },
  { path: 'portfolio',
   loadChildren: () => import('./aem/portfolio/portfolio/portfolio.routing.module').then(m => m.PortfolioRoutingModule)
  },
  { path: 'configureData',
   loadChildren: () =>
   import('./aem/portfolio/dataConfiguration/data.configuration.routing.module').then(m => m.DataConfigurationRoutingModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
