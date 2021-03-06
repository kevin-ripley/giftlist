import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
  allmygroups;
  backgroundImage = "https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/listbackgrounds%2Fsparkle.jpg?alt=media&token=f9bcbf81-7b96-440b-a463-e94701d9b0b4"
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public loadingCtrl: LoadingController, public groupservice: GroupsProvider, public userService: UserProvider) {
  }

  ionViewDidEnter() {
    this.groupservice.getmygroups();
    this.events.subscribe('allmygroups', () => {
      this.allmygroups = this.groupservice.mygroups;
    })
  }

  groupRefresh(refresher) {
    this.groupservice.getmygroups();
    this.events.subscribe('allmygroups', () => {
      this.allmygroups = this.groupservice.mygroups;
    })
    setTimeout(() => {
      refresher.complete(); // stops the refresher 2 seconds after retreiving the Data
    }, 2000);
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