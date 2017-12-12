import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandsearchPage } from './brandsearch';

@NgModule({
  declarations: [
    BrandsearchPage,
  ],
  imports: [
    IonicPageModule.forChild(BrandsearchPage),
  ],
})
export class BrandsearchPageModule {}
