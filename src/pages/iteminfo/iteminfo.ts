import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ListItem } from '../../models/listItem';

/**
 * Generated class for the IteminfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-iteminfo',
  templateUrl: 'iteminfo.html',
})
export class IteminfoPage {
  Lkey: any;
  Ikey: any;
  items = {} as ListItem;
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
  editing;
  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseServiceProvider, public alertCtrl: AlertController) {
  
  }
  
  ionViewWillLoad() {
    this.Lkey = this.navParams.get('Lkey');
    this.Ikey = this.navParams.get('Ikey');
    this.items = this.navParams.get('listItem');
    this.editing = false;
    
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
    this.firebaseService.updateItemRank(this.Lkey, this.Ikey, this.rank)
  };

  deleteItem(){
    this.firebaseService.removeItem(this.Ikey, this.Lkey);
      let alert = this.alertCtrl.create({
        title: 'Item Deleted!',
        message: 'Your Item was Deleted From Your List!',
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              console.log('Okay Clicked!');
            }
          }
        ]
      });
      alert.present();
     // this.navCtrl.push('ListitemsPage', {key: this.Lkey});
  }

  save(items: ListItem){
    this.firebaseService.updateItem(this.Lkey, this.Ikey, items);
    this.editing = false;
  }


}
