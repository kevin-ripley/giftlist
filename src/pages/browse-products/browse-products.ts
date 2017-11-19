import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListItem } from '../../models/listItem';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
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

  constructor(private firebaseService: FirebaseServiceProvider, private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.item = this.navParams.get('item');

    this.lists = this.firebaseService.getLists();
  }

  addToList(listItem: ListItem){

    this.listItem.name = this.item.name;
    this.listItem.price = this.item.salePrice;
    this.listItem.image = this.item.largeImage;
    if(this.item.shortDescription == null){
      this.listItem.description = 'N/A';
    }
    else{
      this.listItem.description = this.item.shortDescription;
    }
    this.listItem.seller = 'Walmart';
    this.listItem.listshared = listItem.listshared;
    this.firebaseService.addItem(this.listItem);
    let alert = this.alertCtrl.create({
      title: 'Item Added!',
      message: 'Your Item was Added To Your List!',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  goBack() {
    this.navCtrl.pop();
  }

}
