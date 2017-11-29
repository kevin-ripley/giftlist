import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListItem } from '../../models/listItem';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

/**
 * Generated class for the BrowseProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-browse-products',
  templateUrl: 'browse-products.html',
})
export class BrowseProductsPage {

  item: any;
  listItem = {} as ListItem;
  lists:any;
  listshared: any;
  rank: any;
  data = {"iconStars": [
    {
        "isActive": true,
        "iconActive": "icon-star-outline",
        "iconInactive": "icon-star"
    },
    {
        "isActive": true,
        "iconActive": "icon-star-outline",
        "iconInactive": "icon-star"
    },
    {
        "isActive": true,
        "iconActive": "icon-star-outline",
        "iconInactive": "icon-star"
    },
    {
        "isActive": true,
        "iconActive": "icon-star-outline",
        "iconInactive": "icon-star"
    },
    {
        "isActive": true,
        "iconActive": "icon-star-outline",
        "iconInactive": "icon-star"
    }
  ]
  };

  constructor(private firebaseService: FirebaseServiceProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.item = this.navParams.get('item');

    this.lists = this.firebaseService.getLists();
  }

  addToList(listItem: ListItem){

    this.listItem.name = this.item.name;
    this.listItem.price = this.item.salePrice;
    this.listItem.image = this.item.largeImage;
    if(this.item.shortDescription == null){
      this.listItem.description = '';
    }
    else{
      this.listItem.description = this.item.shortDescription;
    }
    this.listItem.seller = 'Walmart';
    this.listItem.listshared = this.item.listshared;
    this.listItem.rank = this.rank;
    this.firebaseService.addItem(this.item.listshared, this.listItem);
   
  }

  onStarClass(items: any, index: number, e: any) {
    for (var i = 0; i < items.length; i++) {
      items[i].isActive = i <= index;
    }
    if(index == 4){
      this.rank = 0;
    }
    if(index == 3){
      this.rank = 1;
    }
    if(index == 2){
      this.rank = 2;
    }
    if(index == 1){
      this.rank = 3;
    }
    if(index == 0){
      this.rank = 4;
    }
    console.log(this.rank + ' Index ' + index);
  };

  goBack() {
    this.navCtrl.pop();
  }

}
