import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray, AlertController, FabContainer } from 'ionic-angular';
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
  index: any;
  rank: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseServiceProvider, public alertCtrl: AlertController) {
    this.key = this.navParams.get('key');
    this.listItemRef$ = this.firebaseService.getItems(this.key);
    console.log(this.listItemRef$);
  }
  getRanking(num) {
    if(num == 4){
      this.rank = 0;
    }
    if(num == 3){
      this.rank = 1;
    }
    if(num == 2){
      this.rank = 2;
    }
    if(num == 1){
      this.rank = 3;
    }
    if(num == 0){
      this.rank = 4;
    }
    return new Array(this.rank);
  }

  ionViewDidEnter() {
    this.key = this.navParams.get('key');
    this.listItemRef$ = this.firebaseService.getItems(this.key);
  }

  
  goToItem(key){
    this.navCtrl.push('IteminfoPage', {Ikey : key, Lkey: this.key});
  }

  manualAddItem(fab: FabContainer) {
    fab.close();
    this.navCtrl.push('ItemcreatePage', { key: this.key });
  }

}
