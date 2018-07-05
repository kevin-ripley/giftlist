import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Observable';



@Injectable()
export class ProductsProvider {
  items: any;
  combined: any;

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
  
  getWalmart(data, num){
    if(num == 0){
      return this.http.get(this.url + data +'&format=json&apiKey=kzejb2ckufsrgv27c43anc59');
    }
    this.combined = data;
    var numLoad = num*10;
    return this.http.get(this.url + data +'&format=json&apiKey=kzejb2ckufsrgv27c43anc59&start='+numLoad);
  }

  // loadMore(num){
  //   var numLoad = num*10;
  //   console.log(numLoad + this.combined);
  //   return this.http.get(this.url + this.combined +'&format=json&apiKey=kzejb2ckufsrgv27c43anc59&start='+numLoad);
  // }


  searchBestBuy(filter){
    return this.http.get('https://api.bestbuy.com/v1/products(search='+filter+')', {params: { format: "json", show: 'sku,image,name,longDescription,salePrice,ThumbnailImage', apiKey:'es0ABPeYLuDDs8fsPRKW4DXZ'}})
  }

  brandSearch(data){
    return this.http.get(`http://api.walmartlabs.com/v1/paginated/items?brand=`+data).do(res => console.log(res));
  }


  //Best Buy Key - es0ABPeYLuDDs8fsPRKW4DXZ
}
