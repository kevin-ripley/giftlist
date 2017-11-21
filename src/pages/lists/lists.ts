import { List } from './../../models/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';


/**
 * Generated class for the ListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {

  list = {} as List;
  listRef$: FirebaseListObservable<List[]>;
  refresher: any;

  constructor(public navCtrl: NavController, private firebaseService: FirebaseServiceProvider) {
    this.listRef$ = this.firebaseService.getLists();
  }


  undo = (slidingItem: ItemSliding) => {
    slidingItem.close();
  }
  newList() {
    this.navCtrl.push('ListCreatePage');
  }

  removeList(id) {
    this.firebaseService.removeLists(id);
  }
  shareList(id) {
    this.firebaseService.shareList(id);
  }
  seeItems(key) {
    this.navCtrl.push('ListitemsPage', { key: key });
  }



}
