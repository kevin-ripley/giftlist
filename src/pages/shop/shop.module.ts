import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopPage } from './shop';

@NgModule({
  declarations: [
    ShopPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopPage),
  ],
  exports: [
    ShopPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopPageModule {}
