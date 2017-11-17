import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class ChatProvider {
  firebuddychats = firebase.database().ref('/friendchats');
  friend: any;
  buddymessages = [];
  constructor(public events: Events) {
  }

  initializefriend(friend) {
    this.friend = friend;
  }

  addnewmessage(msg) {
    if (this.friend) {
      var promise = new Promise((resolve, reject) => {
        this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.friend.uid).push().set({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          this.firebuddychats.child(this.friend.uid).child(firebase.auth().currentUser.uid).push().set({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            resolve(true);
          }).catch((err) => {
            reject(err);
          })
        })
      })
      return promise;
    }
  }

  getbuddymessages() {

    let temp;
    this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.friend.uid).on('value', (snapshot) => {
      this.buddymessages = [];
      temp = snapshot.val();
      for (var tempkey in temp) {
        this.buddymessages.push(temp[tempkey]);
      }
      this.events.publish('newmessage');
    })
  }

}
