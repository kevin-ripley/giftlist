import { ListItem } from './../../models/listItem';
import { Events } from 'ionic-angular';
import { List } from './../../models/list';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { UserProvider } from '../user/user';

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
  firegroup;
  key;
  owner;
  shared;
  ownername;
  mylists;
  

  constructor(public afDatabase: AngularFireDatabase, public afAuth: AngularFireAuth, public events: Events, private userService: UserProvider) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
    this.firelist = firebase.database().ref('lists/' + this.afAuth.auth.currentUser.uid);
    this.firegroup = firebase.database().ref('groups/' + this.afAuth.auth.currentUser.uid);
  }

  getLists() {
    this.firelist.once('value', (snapshot) => {
      this.mylists = [];
      if (snapshot.val() != null) {
        var temp = snapshot.val();
        for (var key in temp) {
          var mylist = {
            key: key,
            name: temp[key].name,
            expiration_date: temp[key].expiration_date,
            image: temp[key].image
          }
          this.mylists.push(mylist);
        }
      }
      this.events.publish('allmylists');
    })

    return this.afDatabase.list('lists/' + this.afAuth.auth.currentUser.uid);
  }

  getSpecificList(key){
    return this.afDatabase.list('lists/' + this.afAuth.auth.currentUser.uid + '/' + key);
  }

  addLists(list: List) {
    list.owner = this.afAuth.auth.currentUser.uid;
    this.afDatabase.list('lists/'+ this.afAuth.auth.currentUser.uid).push(list);
  }


  removeLists(id) {
    this.firelist.once('value', (snapshot) => {
      snapshot.ref.child(id).remove();
    })
    
  }
  getSpecificItem(Ikey, Lkey){
    return this.firelist.child(Lkey).child('items').child(Ikey);
  }
  
  removeItem(Ikey, Lkey){
    this.afDatabase.list('lists/'+ this.afAuth.auth.currentUser.uid + '/' + Lkey + '/items/').remove(Ikey);
  }

  getItems(key){
    return this.afDatabase.list('lists/' + this.afAuth.auth.currentUser.uid + '/' + key + '/items', {
      query: {
        orderByChild: 'rank'
      }
      });
  }

  updateItemName(Lkey, Ikey, newname) {
    var promise = new Promise((resolve, reject) => {
      this.firelist.child(Lkey).child('items').child(Ikey).update({
        description: newname,
      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  updateItemRank(Lkey, Ikey, newrank) {
    var promise = new Promise((resolve, reject) => {
      this.firelist.child(Lkey).child('items').child(Ikey).update({
        rank: newrank,
      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  addItem(key, listItem: ListItem) {
    var promise = new Promise((resolve, reject) => {
    this.afDatabase.list('lists/'+ this.afAuth.auth.currentUser.uid + '/' + key + '/items').push(listItem).then(() => {
      resolve(true);
    })
  });
  return promise;
  }


}
