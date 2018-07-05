import { ProductsProvider } from './../../providers/products/products';
import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { ListItem } from './../../models/listItem';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ScannedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scanned',
  templateUrl: 'scanned.html',
})
export class ScannedPage {
  barcode: any;
  listItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseServiceProvider, public productService: ProductsProvider) {
    this.barcode = this.navParams.get('scanData');
    console.log(this.barcode); 
    this.productService.getItem(this.barcode).then(data => {
      this.listItem = data.items;
    });
  }

  // If Item is clicked then push to Browse Products Page with Detail
  openDetails(item) {
    this.navCtrl.push('BrowseProductsPage', {item: item});
  }

  back(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() { 
    console.log('ionViewDidLoad ScannedPage');
    console.log(this.barcode);
  }

}
