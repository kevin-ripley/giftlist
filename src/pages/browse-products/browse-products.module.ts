import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowseProductsPage } from './browse-products';

@NgModule({
  declarations: [
    BrowseProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(BrowseProductsPage),
  ],
})
export class BrowseProductsPageModule {}
