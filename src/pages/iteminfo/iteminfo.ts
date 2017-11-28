import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
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
  itemRef$: FirebaseListObservable<ListItem[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseServiceProvider) {
    this.Lkey = this.navParams.get('Lkey');
    this.Ikey = this.navParams.get('Ikey');
    this.itemRef$ = this.firebaseService.getSpecificItem(this.Ikey, this.Lkey);
    
  }
  ionViewDidEnter() {
    this.Lkey = this.navParams.get('Lkey');
    this.Ikey = this.navParams.get('Ikey');
    this.itemRef$ = this.firebaseService.getSpecificItem(this.Ikey, this.Lkey);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IteminfoPage');
  }

}
