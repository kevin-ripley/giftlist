import { ProductsProvider } from './../../providers/products/products';
import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { ListItem } from './../../models/listItem';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-scanned',
  templateUrl: 'scanned.html',
})
export class ScannedPage {
  barcode: any;
  listItem: any;
  item: any;
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseServiceProvider, public productService: ProductsProvider) {
    this.barcode = this.navParams.get('scanData');
  }

  // If Item is clicked then push to Browse Products Page with Detail
  openDetails(item) {
    this.navCtrl.push('BrowseProductsPage', {item: item});
  }

  back(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() { 
    this.barcode = this.navParams.get('scanData');
    this.productService.getItem(this.barcode).subscribe(data => {
      this.data = data;
      this.listItem = this.data.items;
      console.log(this.data + " is the data coming back");
    });
  }

}
