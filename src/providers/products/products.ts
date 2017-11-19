import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsProvider {
  items: any;
  constructor(public http: HttpClient) {
    
    
  }
  getItem(data) {
    if (this.items) {
      // already loaded data
      return Promise.resolve(this.items);
    }
    return new Promise(resolve => {
      this.http.get('http://api.walmartlabs.com/v1/items?upc='+data +'&format=json&apiKey=kzejb2ckufsrgv27c43anc59')
        .subscribe(data => {
          resolve(data);
        });
      });
  }
  getWalmart(data){
    if (this.items) {
      // already loaded data
      return Promise.resolve(this.items);
    }
    return new Promise(resolve => {
      this.http.get('http://api.walmartlabs.com/v1/search?query='+data +'&format=json&apiKey=kzejb2ckufsrgv27c43anc59')
        .subscribe(data => {
          resolve(data);
        });
      });
    
  }

  getAmazon(data){
    if (this.items) {
      // already loaded data
      return Promise.resolve(this.items);
    }
    return new Promise(resolve => {
     this.http.get('http://webservices.amazon.com/onca/xml?', {params: { Service: "AWSECommerceService", AWSAccessKeyID: "AKIAIAIUH7SDPYYLLZJA", AssociateTag:" ripleyorigina-20", Operation:"ItemSearch", Keywords:"data"}})
     .subscribe(data => {
      resolve(data);
    });
  });
    }

  searchBestBuy(filter){
    return this.http.get('https://api.bestbuy.com/v1/products(search='+filter+')', {params: { format: "json", show: 'sku,image,name,longDescription,salePrice,ThumbnailImage', apiKey:'es0ABPeYLuDDs8fsPRKW4DXZ'}})
  }


  //Best Buy Key - es0ABPeYLuDDs8fsPRKW4DXZ
}
