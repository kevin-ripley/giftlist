import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
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
  items = [];
  searching: any = false;
  data: any;
  errorMessage: string;
  page = 0;
  

  constructor( public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public provide: ProductsProvider, public loadingCtrl: LoadingController) {
    this.searchControl = new FormControl(); 
  }

  ionViewDidLoad() {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present(); 
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(4000).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });    
    loadingPopup.dismiss();
  }

  // displayBanner() {
  //   const bannerConfig: AdMobFreeBannerConfig = {
  //     // we will just use a test id for this tutorial
  //     id: 'ca-pub-3508855280895987/9057321542',
  //     isTesting: true,
  //     autoShow: true,
  //     bannerAtTop: true // default is false
  //   };

  //   this.adMobFree.banner.config(bannerConfig);

  //   this.adMobFree.banner.prepare().then((result) => {
  //     console.log(result);
  //   }, (reason) => {
  //     console.log(reason);
  //   });

  // }

  loadMore(infiniteScroll){
    this.page += 1;
    this.setFilteredItems(infiniteScroll);      
  }

  onSearchInput() {
    this.searching = true;
    this.setFilteredItems();
    this.page = 0;
    this.items = [];
  }

  // Grabbing Items from the Products Provider
  setFilteredItems(infiniteScroll?) {
    
    this.provide.getWalmart(this.searchTerm, this.page)
      .subscribe(data => {
        this.data = data;
        this.items = this.items.concat(this.data.items);
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      });
    
  }

  // If Item is clicked then push to Browse Products Page with Detail
  openDetails(item) {
    this.navCtrl.push('BrowseProductsPage', { item: item });
  }

  cancel() {
    this.navCtrl.pop();
  }

}
