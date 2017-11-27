import { GroupsProvider } from './../../providers/groups/groups';
import { ListItem } from './../../models/listItem';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';

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
  
  listItem = {} as ListItem;
  listItemRef$: FirebaseListObservable<ListItem[]>;
  key: any;
 items;
  constructor(public navCtrl: NavController, public navParams: NavParams, private groupService: GroupsProvider) {
    this.key = this.navParams.get('key');
    this.listItemRef$ = this.groupService.getSharedItems(this.key);
    console.log(this.items);
  }

  ionViewDidLoad() {
    console.log(this.key);
    console.log('ionViewDidLoad SharedlistPage');
  }

}
