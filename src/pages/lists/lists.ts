import { GroupsProvider } from './../../providers/groups/groups';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { List } from './../../models/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, Events, LoadingController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';


/**
 * Generated class for the ListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {

  list = {} as List;
  listRef$: FirebaseListObservable<List[]>;
  refresher: any;
  allmygroups;
  testRadioOpen: boolean;
  testRadioResult;
  constructor(public loadingCtrl: LoadingController,public events: Events, private groupService: GroupsProvider,public navCtrl: NavController, private firebaseService: FirebaseServiceProvider, private alertCtrl: AlertController) {
    this.listRef$ = this.firebaseService.getLists();
    this.groupService.getmygroups();
  }
  ionViewDidEnter(){
    let loader = this.loadingCtrl.create({
      content: 'Getting your groups, Please wait...'
    });
    loader.present();
    this.groupService.getmygroups();
    loader.dismiss();
    this.events.subscribe('allmygroups', () => {
      this.allmygroups = this.groupService.mygroups;
    })
  }

  undo = (slidingItem: ItemSliding) => {
    slidingItem.close();
  }
  newList() {
    this.navCtrl.push('ListCreatePage');
  }

  removeList(id) {
    this.firebaseService.removeLists(id);
  }
  shareList(id) {
    
    let alert = this.alertCtrl.create();

    for(var k in this.allmygroups){
      alert.addInput({
        type: 'radio',
        label: this.allmygroups[k].groupName,
        value: 'blue'
      });
    }

    alert.setTitle('Pick Group');

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });
    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }

  seeItems(key) {
    this.navCtrl.push('ListitemsPage', { key: key });
  }



}
