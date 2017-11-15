import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListItem } from '../../models/listItem';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';

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

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('item');
    
  }

  addToList(listItem: ListItem){
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`items/${auth.uid}`).set(this.listItem)
      .then(() => this.navCtrl.pop());

    })
  }

  goBack() {
    this.navCtrl.pop();
  }

}
