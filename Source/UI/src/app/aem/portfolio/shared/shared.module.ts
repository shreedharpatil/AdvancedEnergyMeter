import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from '../../login/authentication/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        UserProfileComponent
    ],
    imports: [
        RouterModule,
        HttpClientModule,
      ],
    providers: [AuthService],
    exports: [HeaderComponent,
        FooterComponent,
        UserProfileComponent]
})

export class SharedModule { };
