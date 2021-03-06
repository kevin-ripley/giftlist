import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListItem } from '../../models/listItem';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
  selector: 'page-browse-products',
  templateUrl: 'browse-products.html',
})
export class BrowseProductsPage {

  item: any;
  listItem = {} as ListItem;
  lists: any;
  listshared: any;
  rank: any;
  key: any;
  data = {
    "iconStars": [
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
  }
  ionViewDidEnter() {
    this.lists = this.firebaseService.getLists();
  }

  check(item: ListItem) {

  }

  addToList(item: ListItem) {
  
    if (this.key != null) {
      this.listItem.name = this.item.name;
      this.listItem.price = this.item.salePrice;
      this.listItem.image = this.item.largeImage;
      if (this.item.shortDescription == null) {
        this.listItem.description = '';
      }
      else {
        this.listItem.description = this.item.shortDescription;
      }
      this.listItem.seller = 'Walmart';
      this.listItem.listkey = this.key;
      this.listItem.rank = this.rank;
      this.firebaseService.addItem(this.key, this.listItem);
      this.navCtrl.popTo('ListsPage');
    }
    else{
      let prompt = this.alertCtrl.create({
        title: 'Please Choose A List',
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      });
      prompt.present();
    }
  }

  onStarClass(items: any, index: number, e: any) {
    for (var i = 0; i < items.length; i++) {
      items[i].isActive = i <= index;
    }
    if (index == 4) {
      this.rank = 0;
    }
    if (index == 3) {
      this.rank = 1;
    }
    if (index == 2) {
      this.rank = 2;
    }
    if (index == 1) {
      this.rank = 3;
    }
    if (index == 0) {
      this.rank = 4;
    }
    console.log(this.rank + ' Index ' + index);
  };

  goBack() {
    this.navCtrl.pop();
  }

}
