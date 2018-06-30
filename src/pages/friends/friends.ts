import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { RequestsProvider } from '../../providers/requests/requests';
import { req } from '../../models/request';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  newrequest = {} as req;
  temparr = [];
  filteredusers = [];
  searchString: any = "";
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

  addUser(key) {
    let confirm = this.alertCtrl.create({
      title: 'Add Friend',
      message: 'Add ' + key.firstName + ' ' + key.lastName + ' as a Friend?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.sendreq(key);
          }
        }
      ]
    });
    confirm.present();
  }

  searchuser(searchbar) {
    console.log(this.filteredusers);
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
    this.filteredusers = this.filteredusers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      else if (v.firstName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      else if (v.lastName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender === this.newrequest.recipient)
      alert('You Are Your Friend Always');
    else {
      let successalert = this.alertCtrl.create({
        title: 'Request Sent',
        subTitle: 'Your request was sent to ' + recipient.displayName,
        buttons: ['OK']
      });
      this.requestservice.sendrequest(this.newrequest).then((res: any) => {
        if (res.success) {
          successalert.present();
          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1);
        }
        else {
          let failalert = this.alertCtrl.create({
            title: 'User Is Already Your Friend!',
            buttons: ['OK']
          });
          failalert.present();
          this.navCtrl.pop();
        }
      }).catch((err) => {
        alert(err);
      })
    }
  }


}