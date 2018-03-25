import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray, AlertController, FabContainer, ModalController, Events } from 'ionic-angular';
import { ListItem } from '../../models/listItem';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { GroupsProvider } from '../../providers/groups/groups';
import { ViewController } from 'ionic-angular/navigation/view-controller';
//import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the ListitemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
  options: BarcodeScannerOptions;
  allmygroups;
  testRadioOpen: boolean;
  testRadioResult;
  list;
  image;
  name;

  constructor(public events: Events, private groupService: GroupsProvider, public barcodeScanner: BarcodeScanner, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseServiceProvider, public alertCtrl: AlertController, public viewCtrl: ViewController) {
    this.key = this.navParams.get('key');
    this.list = this.navParams.get('list');
    this.name = this.navParams.get('name');
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
    this.listItemRef$ = this.firebaseService.getItems(this.key);
    this.groupService.getmygroups();
    this.events.subscribe('allmygroups', () => {
      this.allmygroups = this.groupService.mygroups;
    })
  }


  goToItem(listItem: ListItem, key) {
    this.navCtrl.push('IteminfoPage', { Lkey: this.key, Ikey: key, listItem: listItem });
  }

  manualAddItem() {
    this.navCtrl.push('ItemcreatePage', { key: this.key });
  }
  
  delete(){
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
      prompt: "Scan your Wish! "
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {
      this.scanData = barcodeData.text;
      let itemModal = this.modalCtrl.create('ScannedPage', { scanData: this.scanData });
      itemModal.present();

    }, (err) => {
      console.log("Error occured : " + err);
    });
  }

  shop() {
    this.navCtrl.push('ShopPage');
  }

  // regularShare(){
  //   var msg = 'Come check out my list named: ' + this.list.name + ' on GIFT LIST';
  //   this.socialSharing.share(msg, null, null, null);
  // }

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
