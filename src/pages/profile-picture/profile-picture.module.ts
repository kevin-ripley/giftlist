import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePicturePage } from './profile-picture';

@NgModule({
  declarations: [
    ProfilePicturePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePicturePage),
  ],
})
export class ProfilePicturePageModule {}
