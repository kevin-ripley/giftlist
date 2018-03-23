import { GroupsProvider } from './../../providers/groups/groups';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { List } from './../../models/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, Events, LoadingController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';




@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {

  listRef$: FirebaseListObservable<List[]>;
  refresher: any;
  allmygroups;
  groupowner;
  testRadioOpen: boolean;
  testRadioResult;
  constructor(public loadingCtrl: LoadingController,public events: Events, private groupService: GroupsProvider,public navCtrl: NavController, private firebaseService: FirebaseServiceProvider, private alertCtrl: AlertController) {
    
  }

  ionViewDidEnter(){
    let loader = this.loadingCtrl.create({
      content: 'Loading Components, Please Wait...'
    });
    loader.present();
    this.groupService.getmygroups();
    this.listRef$ = this.firebaseService.getLists();
    this.listRef$ = this.firebaseService.getLists();
    this.groupService.getmygroups();
    this.events.subscribe('allmygroups', () => {
      this.allmygroups = this.groupService.mygroups;
    })
    loader.dismiss();
  }
  
  newList() {
    this.navCtrl.push('ListCreatePage');
  }

  removeList(key) {
    this.firebaseService.removeList(key);
  }

  shareList(list, key) {
    let alert = this.alertCtrl.create();

    for(var k in this.allmygroups){
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
        this.groupService.shareList(list, key, data);
        this.navCtrl.push('GroupchatPage', { groupName: this.testRadioResult});
      }
    });
    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }

  seeItems(list, key, listImage) {
    this.navCtrl.push('ListitemsPage', { list: list, key: key, image: listImage}); 
  }



}
