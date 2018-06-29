import { UserProvider } from './../../providers/user/user';
import { GroupsProvider } from './../../providers/groups/groups';
import { ListItem } from './../../models/listItem';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Profile } from '../../models/profile';


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
  rank: any;
  owner: any;
  ownerDetails: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private groupService: GroupsProvider, private userService: UserProvider, public loadingCtrl: LoadingController) {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();
    this.key = this.navParams.get('key');
    this.owner = this.navParams.get('owner'); 
    this.listItemRef$ = this.groupService.getSharedItems(this.owner, this.key);
    loadingPopup.dismiss();
    console.log(this.key, this.owner);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharedlistPage');
  }

  moreInfo(key: string){
    this.navCtrl.push('IteminfoPage', {Ikey : key, Lkey: this.key});
  }

  getRanking(num) {

    if (num == 4) {
      this.rank = 1;
    }
    if (num == 3) {
      this.rank = 2;
    }
    if (num == 2) {
      this.rank = 3;
    }
    if (num == 1) {
      this.rank = 4;
    }
    if (num == 0) {
      this.rank = 5;
    }
    return new Array(this.rank);
  }

}
