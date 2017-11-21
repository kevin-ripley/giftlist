import { ListItem } from './../../models/listItem';
import { Events } from 'ionic-angular';
import { List } from './../../models/list';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {

  listItems: FirebaseListObservable<ListItem[]> = null;
  userId: string;
  firelist;
  fireitem;
  key;
  

  constructor(public afDatabase: AngularFireDatabase, public afAuth: AngularFireAuth, public events: Events) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
    this.firelist = firebase.database().ref('lists/' + this.afAuth.auth.currentUser.uid);
    this.fireitem = firebase.database().ref('listitems/');
  }

  getLists() {
    return this.afDatabase.list('lists/' + this.afAuth.auth.currentUser.uid);
  }

  addLists(list: List) {
    this.afDatabase.list('lists/'+ this.afAuth.auth.currentUser.uid).push(list);
  }

  shareList(key){
    this.afDatabase.list('groups/').push(key);
  }

  removeLists(id) {
    this.firelist.once('value', (snapshot) => {
      snapshot.ref.child(id).remove();
    })
    
  }

  getItems(key){
   this.key = key;
    return this.afDatabase.list('lists/' + this.afAuth.auth.currentUser.uid + '/' + key + '/items');
  }

  addItem(listItem: ListItem) {
    this.afDatabase.list('lists/'+ this.afAuth.auth.currentUser.uid + '/' + listItem.listshared + '/items').push(listItem);
  }


}
