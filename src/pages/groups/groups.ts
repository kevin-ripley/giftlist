import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the GroupsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
  allmygroups;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public loadingCtrl: LoadingController, public groupservice: GroupsProvider, public userService: UserProvider) {
  }

  ionViewDidEnter() {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();
    this.groupservice.getmygroups();
    
    this.events.subscribe('allmygroups', () => {
      this.allmygroups = this.groupservice.mygroups;
    })
    loadingPopup.dismiss();
    
  }

  ionViewDidLeave() {
    this.events.unsubscribe('allmygroups');
  }

  addGroup() {
    this.navCtrl.push('GroupCreatePage');
  }

  openChat(group) {
    this.groupservice.getintogroup(group.groupName);
    this.navCtrl.push('GroupchatPage', { groupName: group.groupName });
  }



}