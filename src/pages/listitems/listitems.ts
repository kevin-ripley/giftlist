import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray, AlertController } from 'ionic-angular';
import { ListItem } from '../../models/listItem';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

/**
 * Generated class for the ListitemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listitems',
  templateUrl: 'listitems.html',
})
export class ListitemsPage {
  listItem = {} as ListItem;
  listItemRef$: FirebaseListObservable<ListItem[]>;
  key: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseServiceProvider, public alertCtrl: AlertController) {
    this.key = this.navParams.get('key');
    this.listItemRef$ = this.firebaseService.getItems(this.key);
    console.log(this.listItemRef$);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListitemsPage');
  }

  reorderItems = (indexes): void => {
    
}

manualAddItem(){
  this.navCtrl.push('ItemcreatePage', {key: this.key});
}

}
