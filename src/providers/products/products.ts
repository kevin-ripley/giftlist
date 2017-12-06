import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Observable';



@Injectable()
export class ProductsProvider {
  items: any;

  url : string = 'http://api.walmartlabs.com/v1/search?query=';
  constructor(public http: HttpClient) {
  }

  
  getItem(data){
    if (this.items) {
      // already loaded data
      return Promise.resolve(this.items);
    }
    return new Promise(resolve => {
      this.http.get('http://api.walmartlabs.com/v1/items?apiKey=kzejb2ckufsrgv27c43anc59&upc=' + data)
        .subscribe(data => {
          resolve(data);
        });
      });
  }
  
  getWalmart(data){
    return this.http.get(this.url + data +'&format=json&apiKey=kzejb2ckufsrgv27c43anc59').do(res => console.log(res));
  }


  searchBestBuy(filter){
    return this.http.get('https://api.bestbuy.com/v1/products(search='+filter+')', {params: { format: "json", show: 'sku,image,name,longDescription,salePrice,ThumbnailImage', apiKey:'es0ABPeYLuDDs8fsPRKW4DXZ'}})
  }


  //Best Buy Key - es0ABPeYLuDDs8fsPRKW4DXZ
}
