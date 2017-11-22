import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedlistPage } from './sharedlist';

@NgModule({
  declarations: [
    SharedlistPage,
  ],
  imports: [
    IonicPageModule.forChild(SharedlistPage),
  ],
})
export class SharedlistPageModule {}
