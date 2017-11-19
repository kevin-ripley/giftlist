import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListitemsPage } from './listitems';

@NgModule({
  declarations: [
    ListitemsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListitemsPage),
  ],
})
export class ListitemsPageModule {}
