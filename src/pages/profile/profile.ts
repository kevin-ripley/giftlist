import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { ImagehandlerProvider } from '../../providers/imagehandler/imagehandler';
import { UserProvider } from '../../providers/user/user';
import firebase from 'firebase';
import { Profile } from '../../models/profile';


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
  userDetails: FirebaseObjectObservable<Profile>;
  user = {} as Profile;
  displayName: string;
  email: any;
  firstName: string;
  lastName: string;
  photoURL: any;
  uid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public zone: NgZone, public alertCtrl: AlertController,
    public imghandler: ImagehandlerProvider, private agAuth: AngularFireAuth, private userService: UserProvider) {
    this.uid = this.navParams.get('friend');
    this.userDetails = this.userService.getUserInfo(this.uid);

  }

  ionViewDidLoad() {
    this.userDetails = this.userService.getUserInfo(this.uid);
    this.userDetails.subscribe((snapshots) => {
      this.user = snapshots;
      this.displayName = snapshots.displayName;
      this.email = snapshots.email;
      this.firstName = snapshots.firstName;
      this.lastName = snapshots.lastName;
      this.photoURL = snapshots.photoURL;
    })
  }

  editimage() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    this.imghandler.selectImage()
      .then((data) => {
        this.imghandler.uploadProfileImage(data);
        this.userservice.updateimage(data).then((res: any) => {
          if (res.success) {
            statusalert.setTitle('Updated');
            statusalert.setSubTitle('Your Profile Image Was Changed!');
            statusalert.present();
            this.zone.run(() => {
              this.photoURL = data;
            })
          }
        }).catch((err) => {
          statusalert.setTitle('Failed');
          statusalert.setSubTitle('There Was An Error Changing Your Image');
          statusalert.present();
        })
      });

  }

  logout() {
    let prompt = this.alertCtrl.create({
      title: 'Logout',
      subTitle: 'Are You Sure You Want To Logout?',
      buttons: [
        {
          text: 'No',
          handler: data => {
            let navTransition = prompt.dismiss();
            navTransition.then(() => {
              this.navCtrl.pop();
            });
            return false;
          }

        },
        {
          text: 'Yes',
          handler: data => {
            this.lgout();
          }
        }
      ]
    });
    prompt.present();
  }

  lgout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.parent.parent.setRoot('WelcomePage');
    });
  }
}



