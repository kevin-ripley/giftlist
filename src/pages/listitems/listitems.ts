import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray, AlertController, FabContainer, ModalController, Events } from 'ionic-angular';
import { ListItem } from '../../models/listItem';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { GroupsProvider } from '../../providers/groups/groups';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { SocialSharing } from '@ionic-native/social-sharing';
import firebase from 'firebase';


@IonicPage({
  segment: 'lists/:userId/:key/items'
})
@Component({
  selector: 'page-listitems',
  templateUrl: 'listitems.html',

})
export class ListitemsPage {
  listItemRef$: FirebaseListObservable<ListItem[]>;
  key: any;
  index: any;
  rank: any;
  scanData: {};
  shared: Array<any> = [];
  options: BarcodeScannerOptions;
  keyRef$: FirebaseObjectObservable<any[]>;
  allmygroups;
  testRadioOpen: boolean;
  testRadioResult;
  list;
  image;
  name;
  userId;
  shareRef$;
  new_key;
  list_key: any;

  constructor(private afAuth: AngularFireAuth, public events: Events, private groupService: GroupsProvider, private database: AngularFireDatabase, private socialSharing: SocialSharing, public barcodeScanner: BarcodeScanner, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseServiceProvider, public alertCtrl: AlertController, public viewCtrl: ViewController) {
    this.key = this.navParams.get('key');
    this.list = this.navParams.get('list');
    this.name = this.navParams.get('name');
    this.userId = this.navParams.get('userId');
    this.listItemRef$ = this.firebaseService.getItems(this.key);
    this.image = this.navParams.get('image');
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

  ionViewDidEnter() {
    this.key = this.navParams.get('key');
    this.list = this.navParams.get('list');
    this.name = this.navParams.get('name');
    this.userId = this.navParams.get('userId');
    this.listItemRef$ = this.firebaseService.getItems(this.key);
    this.image = this.navParams.get('image');
    this.groupService.getmygroups();
    this.events.subscribe('allmygroups', () => {
      this.allmygroups = this.groupService.mygroups;
    });
    this.shareRef$ = firebase.database().ref(`lists/${this.userId}/${this.key}/items`);
    this.shareRef$.on('value', snapshot => {
      this.shared = [];
      snapshot.forEach(itemSnap => {
        this.shared.push(itemSnap.val());
      });
    });
  }

  goToItem(listItem: ListItem, key) {
    this.navCtrl.push('IteminfoPage', { Lkey: this.key, Ikey: key, listItem: listItem });
  }

  manualAddItem() {
    this.navCtrl.push('ItemcreatePage', { key: this.key });
  }

  delete() {
    let confirm = this.alertCtrl.create({
      title: 'Delete List!',
      message: 'Are you sure you want to delete this list?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.firebaseService.removeList(this.key);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  scan() {
    this.options = {
      prompt: "Scan Item! "
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {
      this.scanData = barcodeData.text;
     this.navCtrl.push('ScannedPage', { scanData: this.scanData });
    }, (err) => {
      console.log("Error occured : " + err);
    });
  }

  shop() {
    this.navCtrl.push('ShopPage');
  }

  regularShare() {
    this.list_key = this.database.list(`public_lists/${this.userId}`).push({
      displayName: this.afAuth.auth.currentUser.displayName,
      image: this.image,
      created: new Date().getTime(),
      items: this.shared
    }).key;
    var msg = 'Come See My List I Made on Gift List!';
    var url = `https://gift-list-58d8f.firebaseapp.com/#/public-lists/${this.userId}/${this.list_key}`;
    var img = 'https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/feature_graphic_gl.png?alt=media&token=b63a4548-5ee6-44fe-8688-29eab598fbef';
    this.socialSharing.share(msg, null, img, url);
    console.log(this.list_key); 
  }

  share() {
    let alert = this.alertCtrl.create();
    for (var k in this.allmygroups) {
      alert.addInput({
        type: 'radio',
        label: this.allmygroups[k].groupName,
        value: this.allmygroups[k].groupName
      });
    }
    alert.setTitle('Pick A Group To Share With!');
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.groupService.shareList(this.list, this.key, data);
        this.navCtrl.setRoot('GroupchatPage', { groupName: this.testRadioResult });
      }
    });
    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }

}
