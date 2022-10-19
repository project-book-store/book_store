import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import {LoginComponent} from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerityResetPasswordComponent } from './verity-reset-password/verity-reset-password.component';
import {ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    VerityResetPasswordComponent,
    RegisterComponent
  ],
    imports: [
        CommonModule,
        SecurityRoutingModule,
        ReactiveFormsModule
    ]
})
export class SecurityModule { }
