import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordResetPage } from './password-reset';

@NgModule({
  declarations: [
    PasswordResetPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordResetPage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PasswordResetPageModule {}
