import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendchatPage } from './friendchat';

@NgModule({
  declarations: [
    FriendchatPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendchatPage),
  ],
})
export class FriendchatPageModule {}
