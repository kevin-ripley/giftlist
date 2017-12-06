import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FinditemsPage } from './finditems';

@NgModule({
  declarations: [
    FinditemsPage,
  ],
  imports: [
    IonicPageModule.forChild(FinditemsPage),
  ],
})
export class FinditemsPageModule {}
