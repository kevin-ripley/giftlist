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

  data: any;
  errorMessage: string;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public provide: ProductsProvider) {
    this.searchControl = new FormControl();
    
  }
  
  ionViewDidLoad() {
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(400).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });
  }

  onSearchInput() {
    this.searching = true;
    this.setFilteredItems();
  }

  doRefresh(refresher) {
    this.setFilteredItems();  // calls the getQuotes method
    setTimeout(() => {
      refresher.complete(); // stops the refresher 2 seconds after retreiving the Data
    }, 2000);
  }

  // Grabbing Items from the Products Provider
  setFilteredItems() {
    this.provide.getWalmart(this.searchTerm)
    .subscribe(data => {
      this.data = data;
      this.items = this.data.items;
    });
    
  }
  // If Item is clicked then push to Browse Products Page with Detail
  openDetails(item) {
    this.navCtrl.push('BrowseProductsPage', {item: item});
  }

  cancel() {
    this.navCtrl.pop();
  }

}
