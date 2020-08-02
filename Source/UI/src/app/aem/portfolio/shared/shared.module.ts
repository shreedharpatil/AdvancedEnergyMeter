import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from '../../login/authentication/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EffectsModule } from '@ngrx/effects';
import { PortfolioEffects } from '../portfolio/portfolio.effects';
import { SharedDataEffects } from '../../shared/shared.data.effects';
import { HttpHelperEffects } from '../../shared/http/http-helper-effects';
import { SpinnerEffects } from '../../shared/spinner/spinner-effects';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        UserProfileComponent
    ],
    imports: [
        RouterModule,
        BrowserModule,
        HttpClientModule,
        EffectsModule.forRoot([PortfolioEffects, SharedDataEffects, HttpHelperEffects, SpinnerEffects]),
      ],
    providers: [AuthService],
    exports: [HeaderComponent,
        FooterComponent,
        UserProfileComponent]
})

export class SharedModule { };
