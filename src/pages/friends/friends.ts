import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { RequestsProvider } from '../../providers/requests/requests';
import { req } from '../../models/request';
import firebase from 'firebase';
/**
 * Generated class for the BuddiesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  newrequest = {} as req;
  temparr = [];
  filteredusers = [];
  myfriends;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public alertCtrl: AlertController,
    public requestservice: RequestsProvider, public events: Events) {
    this.userservice.getallusers().then((res: any) => {
      this.filteredusers = res;
      this.temparr = res;
   })
  }

  ionViewWillEnter() {
    this.requestservice.getmyfriends();
    this.myfriends = [];
    this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
    })

  }

  searchuser(searchbar) {
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.filteredusers = this.filteredusers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender === this.newrequest.recipient)
      alert('You are your friend always');
    
    else {
      let successalert = this.alertCtrl.create({
        title: 'Request sent',
        subTitle: 'Your request was sent to ' + recipient.displayName,
        buttons: ['ok']
      });
    
      this.requestservice.sendrequest(this.newrequest).then((res: any) => {
        if (res.success) {
          successalert.present();
          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1);
        }
      }).catch((err) => {
        alert(err);
      })
    }
  }


}