import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IteminfoPage } from './iteminfo';

@NgModule({
  declarations: [
    IteminfoPage,
  ],
  imports: [
    IonicPageModule.forChild(IteminfoPage),
  ],
})
export class IteminfoPageModule {}
