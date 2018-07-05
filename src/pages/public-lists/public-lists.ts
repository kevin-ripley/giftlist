import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';


@IonicPage({
  segment: 'public-lists/:userId/:listId'
})
@Component({
  selector: 'page-public-lists',
  templateUrl: 'public-lists.html',
})
// Will try to access
// http://localhost:8100/#/public-lists/qQWcrwLig8gRiZ7z0XOhil0Qrui1/-LEX4Yz-5ztNFqKD9DTG
export class PublicListsPage {
  fireitems;
  sharedRef$;
  keyRef$: FirebaseObjectObservable<any[]>;
  itemRef$: FirebaseListObservable<any[]>;
  shared: Array<any> = [];
  userId;
  listId;
  rank;
  displayName;
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.userId = this.navParams.get('userId');
    this.listId = this.navParams.get('listId');
    
    this.sharedRef$ = firebase.database().ref(`public_lists/${this.userId}/${this.listId}/displayName`);
    this.sharedRef$.on('value', snapshot => {
      this.displayName = snapshot.val();
    });

    this.itemRef$ = this.database.list(`public_lists/${this.userId}/${this.listId}/items`);
  }

  ionViewDidLoad() {
    this.fireitems = firebase.database().ref(`public_lists/${this.userId}/${this.listId}/items`);
    
    this.fireitems.on('value', snapshot => {
      snapshot.forEach( itemSnap => {
        this.shared.push(itemSnap.val());
      });
  });    
  console.log(this.shared);
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

}