import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicListsPage } from './public-lists';

@NgModule({
  declarations: [
    PublicListsPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicListsPage),
  ],
})
export class PublicListsPageModule {}
