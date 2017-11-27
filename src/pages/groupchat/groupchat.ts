import { AngularFireAuth } from 'angularfire2/auth';
import { List } from './../../models/list';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events, Content } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ListItem } from '../../models/listItem';



@IonicPage()
@Component({
  selector: 'page-groupchat',
  templateUrl: 'groupchat.html',
})
export class GroupchatPage {
  @ViewChild('content') content: Content;
  creator: boolean = false;
  groupmembers;
  groupName;
  owner;
  photoURL;
  listItem = {} as ListItem;
  list: FirebaseListObservable<List[]>;
  alignuid;
  tempItems;
  listItemRef$: FirebaseListObservable<ListItem[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public groupservice: GroupsProvider, private afAuth: AngularFireAuth,
    public actionSheet: ActionSheetController, private firebaseService: FirebaseServiceProvider, private events: Events) {
    this.photoURL = this.afAuth.auth.currentUser.photoURL;
    this.alignuid = this.afAuth.auth.currentUser.uid;
    this.groupName = this.navParams.get('groupName');
    this.groupservice.getownership(this.groupName).then((res) => {
      if (res)
        this.creator = true;
    }).catch((err) => {
      alert(err);
    })
    this.list =  this.groupservice.getGroupLists(this.groupName);
   
  }
  ionViewDidEnter() {
    
    }

  ionViewDidLeave(){
   this.events.unsubscribe('newgrouplist');
  }

  openList(key){
    this.navCtrl.push('SharedlistPage', { key: key });

  }
  deleteList(key){
    this.groupservice.deletelist(key);
  }



  presentOwnerSheet() {
    let sheet = this.actionSheet.create({
      title: 'Group Actions',
      buttons: [
        {
          text: 'Add member',
          icon: 'person-add',
          handler: () => {
            this.navCtrl.push('GroupfriendsPage');
          }
        },
        {
          text: 'Remove member',
          icon: 'remove-circle',
          handler: () => {
            this.navCtrl.push('GroupmembersPage');
          }
        },
        {
          text: 'Members',
          icon: 'person',
          handler: () => {
            this.navCtrl.push('GroupinfoPage', { groupName: this.groupName });
          }
        },
        {
          text: 'Delete Group',
          icon: 'trash',
          handler: () => {
            this.groupservice.deletegroup().then(() => {
              this.navCtrl.pop();
            }).catch((err) => {
              console.log(err);
            })
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    sheet.present();
  }

  presentMemberSheet() {
    let sheet = this.actionSheet.create({
      title: 'Group Actions',
      buttons: [
        {
          text: 'Leave Group',
          icon: 'log-out',


          handler: () => {
            this.groupservice.leavegroup().then(() => {
              this.navCtrl.pop();
            }).catch((err) => {
              console.log(err);
            })
          }
        },
        {
          text: 'Group Info',
          icon: 'person',
          handler: () => {
            this.navCtrl.push('GroupinfoPage', { groupName: this.groupName });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    sheet.present();
  }

}