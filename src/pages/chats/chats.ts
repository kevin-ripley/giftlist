import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ChatProvider } from './../../providers/chat/chat';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Profile } from '../../models/profile';
import { UserProvider } from '../../providers/user/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ImagehandlerProvider } from '../../providers/imagehandler/imagehandler';
import { List } from '../../models/list';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  myrequests;
  myfriends;
  userDetails: FirebaseObjectObservable<Profile>;
  listRef$: FirebaseListObservable<List[]>;
  segmentView: string = "one";
  following: boolean = false;
  photoURL: any;
  friendcount: any;
  requestcount: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestsProvider,
    public events: Events,public zone: NgZone, public firebaseService: FirebaseServiceProvider, public imghandler: ImagehandlerProvider, public alertCtrl: AlertController, public userService: UserProvider, public agAuth: AngularFireAuth , private chatservice: ChatProvider, public socialSharing: SocialSharing, public loadingCtrl: LoadingController) {
  }


  ionViewWillEnter() {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: ''
    });
    loadingPopup.present();
    this.requestservice.getmyrequests();
    this.requestservice.getmyfriends();
    this.myfriends = [];
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
      this.requestcount = this.myrequests.length;
    })
    this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
      this.friendcount = this.myfriends.length;
    })
    
    console.log(this.friendcount);
    this.listRef$ = this.firebaseService.getLists();
    this.userDetails = this.userService.getUserInfo(this.agAuth.auth.currentUser.uid);
    loadingPopup.dismiss();
  }


  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
  }
  profile(friend){
    this.navCtrl.push('ProfilePage', { friend: friend});
  }

  editImage() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    this.imghandler.selectImage()
      .then((data) => {
        this.imghandler.uploadProfileImage(data);
        this.userService.updateimage(data).then((res: any) => {
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

  addbuddy() {
    this.navCtrl.push('FriendsPage');
  }

  accept(item) {
    this.requestservice.acceptrequest(item).then(() => {

      let newalert = this.alertCtrl.create({
        title: 'Friend Added Successfully!',
        subTitle: '',
        buttons: ['Okay']
      });
      newalert.present();
    })
  }

  ignore(item) {
    this.requestservice.deleterequest(item).then(() => {
      alert('Request Ignored');
    }).catch((err) => {
      alert(err);
    })
  }

  friendchat(friend) {
    this.chatservice.initializefriend(friend);
    this.navCtrl.push('FriendchatPage');
  }
  regularShare(){
    var msg = 'Come Be My Friend on GIFT LIST!';
    var url = 'http:/www.ripleyoriginals.com/gift-list'
    this.socialSharing.share(msg, null, null, url);
  }
  
  facebookShare(index){
    var msg  = 'Come Be My Friend on GIFT LIST!';
    var url = 'http:/www.ripleyoriginals.com/gift-list'
     this.socialSharing.shareViaFacebook(msg, null, url);
   }

   twitterShare(index){
    var msg  = 'Come Be My Friend on GIFT LIST!';
    var url = 'http:/www.ripleyoriginals.com/gift-list'
     this.socialSharing.shareViaTwitter(msg, null, url);
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