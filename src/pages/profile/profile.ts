import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { ImagehandlerProvider } from '../../providers/imagehandler/imagehandler';
import { UserProvider } from '../../providers/user/user';
import firebase from 'firebase';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  avatar: string;
  displayName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public zone: NgZone, public alertCtrl: AlertController,
    public imghandler: ImagehandlerProvider) {
  }

  ionViewWillEnter() {
    this.loaduserdetails();
  }

  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
    })
  }
  editimage() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    this.imghandler.selectImage()
    .then((data) =>
    {
      this.imghandler.uploadProfileImage(data);
      this.userservice.updateimage(data).then((res: any) => {
        if (res.success) {
          statusalert.setTitle('Updated');
          statusalert.setSubTitle('Your Profile Image Was Changed!');
          statusalert.present();
          this.zone.run(() => {
          this.avatar = data;
        })  
        }  
      }).catch((err) => {
          statusalert.setTitle('Failed');
          statusalert.setSubTitle('There Was An Error Changing Your Image');
          statusalert.present();
      })
      });
      
  }

  logout(){
    firebase.auth().signOut().then(() => {
      this.navCtrl.parent.parent.setRoot('LoginPage');
    })
  }
}
