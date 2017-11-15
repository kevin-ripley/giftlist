import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import { ProductsProvider } from '../../providers/products/products';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  products: Observable<any>;
  searchTerm: string = '';
  searchControl: FormControl;
  items: any;
  searching: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public provide: ProductsProvider) {
    this.searchControl = new FormControl();
    this.setFilteredItems();
  }
  

  ionViewDidLoad() {
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });
  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {
    
    this.provide.getWalmart(this.searchTerm)
    .then(data => {
      this.items = data.items;
      console.log(this.items);
    });
    
  }

  openDetails(item) {
    this.navCtrl.push('BrowseProductsPage', {item: item});
  }

  cancel() {
    this.navCtrl.pop();
  }

  addToList(){

  }
}
