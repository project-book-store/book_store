import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import {LoginComponent} from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerityResetPasswordComponent } from './verity-reset-password/verity-reset-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    VerityResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
