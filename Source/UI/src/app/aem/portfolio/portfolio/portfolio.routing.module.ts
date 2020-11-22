import { Routes, RouterModule } from '@angular/router';
import { BlockUserComponent } from './block-user/block-user.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { EffectsModule } from '@ngrx/effects';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PortfolioMenusComponent } from './portfolio.menus/portfolio.menus.component';
import { PortfolioComponent } from './portfolio.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  { path: '',
    component: PortfolioComponent,
    children: [
      { path: 'block-user', component: BlockUserComponent }
    ]}
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot(),
    EffectsModule.forFeature([]),
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    BlockUserComponent,
    PortfolioMenusComponent,
    PortfolioComponent,
    ]
})

export class PortfolioRoutingModule { }