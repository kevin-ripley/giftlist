import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ListItem } from './../../models/listItem';
import { Events } from 'ionic-angular';
import { List } from './../../models/list';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { UserProvider } from '../user/user';

/*
  HELPFUL FOR PUSHING ID AS KEY!! REFERENCE
 const data = { [this.userId]: true };
 var list_key = this.afDatabase.list('lists/').push(list).key;
 this.afDatabase.object(`users/${this.userId}/lists/${list_key}`).update(data);
*/


@Injectable()
export class FirebaseServiceProvider {
  //list of List obects
  lists: FirebaseListObservable<List[]> = null;
  //single List object
  list: FirebaseObjectObservable<List> = null;
  //list of Items objects
  items: FirebaseListObservable<ListItem[]> = null;
  //authenticated user id
  userId: string;
  //single Item object
  listItem: FirebaseObjectObservable<ListItem> = null;


  constructor(public alertCtrl: AlertController, public afDatabase: AngularFireDatabase, public afAuth: AngularFireAuth, public events: Events, private userService: UserProvider) {
    this.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid
    })
  }

  getLists(): FirebaseListObservable<List[]> {
    if (!this.userId) return;
    this.lists = this.afDatabase.list(`lists/${this.userId}`);
    return this.lists;
  }

  getSpecificList(key: string): FirebaseObjectObservable<List> {
    this.list = this.afDatabase.object(`lists/${this.userId}/${key}`);
    return this.list;
  }

  addLists(list: List) {
    if (!this.userId) return;
    list.owner = this.userId;
    this.afDatabase.list(`lists/${this.userId}`).push(list);
  }

  add_public_lists(list: List){
    if (!this.userId) return;
    list.owner = this.userId;
    this.afDatabase.list(`public_lists/${this.userId}`).push(list);
  }


  removeList(key: string): void {
    const list = this.afDatabase.list(`lists/${this.userId}/${key}/listshared`);
    var shared = [];
    var owners = [];
    list.subscribe((snapshots) => {
      for (var key in snapshots){
        shared.push(snapshots[key].groupname);
      }
    });
    shared.forEach(element => {
      //element is the groupname
      this.afDatabase.object(`groups/${firebase.auth().currentUser.uid}/${element}`).subscribe((snapshot) => {
        owners.push(snapshot.creator);
        //owners is an Array with creator/owner of Lists
        var members = this.afDatabase.list(`groups/${snapshot.creator}/${element}/members`);
        members.subscribe((membs) => {
            for(var k in membs){
              
              this.afDatabase.list(`groups/${membs[k].uid}/${element}/lists`).remove(key).then(() => {
                this.afDatabase.list(`groups/${snapshot.creator}/${element}/lists`).remove(key);
              })
            }
          });
      
      });
        
    });
    this.afDatabase.list(`lists/${this.userId}`).remove(key);
  }

  getItems(key: string): FirebaseListObservable<ListItem[]> {
    this.items = this.afDatabase.list(`lists/${this.afAuth.auth.currentUser.uid}/${key}/items`, {
      query: {
        orderByChild: 'rank',
        limitToFirst: 40
      }
    });
    return this.items;
  }


  getSpecificItem(Ikey, Lkey): FirebaseObjectObservable<ListItem> {
    if (!this.userId) return;
    return this.afDatabase.object(`lists/${this.userId}/${Lkey}/items/${Ikey}`);
  }

  addItem(key: string, listItem: ListItem) {
   
    if (!this.userId) return;
    var promise = new Promise((any) => {
      this.afDatabase.list(`lists/${this.userId}/${key}/items`).push(listItem).then(() => {
        let alert = this.alertCtrl.create({
          title: 'Item Added!',
          message: 'Your Item was Added To Your List!',
          buttons: [
            {
              text: 'Okay',
              handler: () => {
                
              }
            }
          ]
        });
        alert.present();
      })
    }).catch(err => {
      let alert = this.alertCtrl.create({
      title: 'Failed to Add Item',
      message: 'Make Sure to Choose A List!',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
           
          }
        }
      ]
    });
    alert.present();
  })
    return promise;

  }

  removeItem(Ikey: string, Lkey: string): void {
    if (!this.userId) return;
    this.afDatabase.list(`lists/${this.userId}/${Lkey}/items`).remove(Ikey);
  }


  updateItem(Lkey, Ikey, listItem: ListItem) {
    this.listItem = this.afDatabase.object(`lists/${this.userId}/${Lkey}/items/${Ikey}`);
    this.listItem.update(listItem);
  }

  updateItemRank(Lkey, Ikey, newrank) {
    
    var promise = new Promise((resolve, reject) => {
    this.listItem = this.afDatabase.object(`lists/${this.userId}/${Lkey}/items/${Ikey}`);
    this.listItem.update({
      rank: newrank,
    })
  })
  return promise;
  }

}
