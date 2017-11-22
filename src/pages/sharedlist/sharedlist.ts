import { ListItem } from './../../models/listItem';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SharedlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sharedlist',
  templateUrl: 'sharedlist.html',
})
export class SharedlistPage {
  items = {} as ListItem;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = this.navParams.get('items').items;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharedlistPage');
  }

}
