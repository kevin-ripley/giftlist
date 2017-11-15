import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListsPage } from './lists';

@NgModule({
  declarations: [
    ListsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListsPage),
  ],
  exports: [
    ListsPage
  ]
})
export class ListsPageModule {}
