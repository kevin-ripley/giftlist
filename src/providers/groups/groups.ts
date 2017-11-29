import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ListItem } from '../../models/listItem';

/*
  Generated class for the GroupsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroupsProvider {
  firegroup = firebase.database().ref('/groups');
  firelist = firebase.database().ref('/lists');
  mygroups: Array<any> = [];
  currentgroup: Array<any> = [];
  listItems: FirebaseListObservable<ListItem[]> = null;
  currentgroupname;
  grouppic;
  owner;
  ownername;
  grouplist;
  ownerimage;
  creator;

  constructor(public events: Events, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {

  }

  addgroup(newGroup) {
    var promise = new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(newGroup.groupName).set({
        groupPic: newGroup.groupPic,
        creator: firebase.auth().currentUser.uid
      }).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      })
    });
    return promise;
  }


  getmygroups() {
    this.firegroup.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      this.mygroups = [];
      if (snapshot.val() != null) {
        var temp = snapshot.val();
        for (var key in temp) {
          var newgroup = {
            groupName: key,
            groupPic: temp[key].groupPic
          }
          this.mygroups.push(newgroup);
        }
      }
      this.events.publish('allmygroups');
    })

  }


  shareList(list, key, groupname) {
    return new Promise((resolve) => {
      this.firelist.child(firebase.auth().currentUser.uid).child(key).child('listshared').push({
        groupname
      });
      this.owner = firebase.auth().currentUser.uid;
      this.ownername = firebase.auth().currentUser.displayName;
      this.ownerimage = this.afAuth.auth.currentUser.photoURL
      this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).child('creator').once('value', (snapshot) => {
        var tempowner = snapshot.val();
        this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).child('lists').child(key).set({
          name: list.name,
          owner: this.owner,
          ownername: this.ownername,
          ownerimage: this.ownerimage,
          items: list.items,
          image: list.image,
          expiration_date: list.expiration_date
        }).then(() => {
          if (tempowner != firebase.auth().currentUser.uid) {
            this.firegroup.child(tempowner).child(groupname).child('lists').child(key).set({
              name: list.name,
              owner: this.owner,
              ownername: this.ownername,
              ownerimage: this.ownerimage,
              items: list.items,
              image: list.image,
              expiration_date: list.expiration_date
            })
          }
          var tempmembers = [];
          this.firegroup.child(tempowner).child(groupname).child('members').once('value', (snapshot) => {
            var tempmembersobj = snapshot.val();
            for (var key in tempmembersobj)
              tempmembers.push(tempmembersobj[key]);
          }).then(() => {
            let postedlists = tempmembers.map((item) => {
              if (item.uid != firebase.auth().currentUser.uid) {
                return new Promise((resolve) => {
                  this.postlists(item, list, groupname, this.owner, this.ownername, this.ownerimage, resolve, key);
                })
              }
            })
            Promise.all(postedlists).then(() => {
              this.getGroupLists(groupname);
              resolve(true);
            })
          })
        })
      })
    })
  }

  postlists(member, list, groupname, owner, ownername, ownerimage, cb, key) {
    this.firegroup.child(member.uid).child(groupname).child('lists').child(key).set({
      name: list.name,
      owner: owner,
      ownername: ownername,
      ownerimage: ownerimage,
      items: list.items,
      image: list.image,
      expiration_date: list.expiration_date
    }).then(() => {
      cb();
    })
  }

  // postItems(key, groupname, cb){
  //   this.firegroup.child(member.uid).child(groupname).child('lists').child(key).update({
  //     items: list.items
  //   }).then(() => {
  //     cb();
  //   })
  // }

  //   updateItems(key, listItem: ListItem){
  //     return new Promise((resolve) => {
  //     var tempgroup = [];
  //     this.firelist.child(firebase.auth().currentUser.uid).child(key).child('listshared').on('value', (snapshot) => {
  //       var tempgroupobj = snapshot.val();
  //       for (var key in tempgroupobj)
  //       tempgroup.push(tempgroupobj[key].groupname);
  //       let postgroupname = tempgroup.map((groupname) => {
  //         return new Promise((resolve) => {
  //           this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).child('creator').once('value', (snapshot) => {
  //             var tempowner = snapshot.val();

  //         var tempmembers = [];

  //         this.firegroup.child(tempowner).child().child('members').once('value', (snapshot) => {
  //           var tempmembersobj = snapshot.val();
  //           for (var key in tempmembersobj)
  //             tempmembers.push(tempmembersobj[key]);
  //         }).then(() => {
  //           let postedlists = tempmembers.map((item) => {
  //             if (item.uid != firebase.auth().currentUser.uid) {
  //               return new Promise((resolve) => {
  //                 this.postlists(item, list, groupname, this.owner, this.ownername, this.ownerimage, resolve, key);
  //               })
  //             }
  //           })
  //         })
  //       })
  //     })


  //         Promise.all(postedlists).then(() => {
  //           this.getGroupLists(groupname);
  //           resolve(true);
  //         })
  //       })

  //     })
  //     //this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('lists').child(key).child('items').set(listItem);
  //   })
  // }

  getGroupLists(groupname) {
    return this.afDatabase.list('groups/' + firebase.auth().currentUser.uid + '/' + `${groupname}` + '/' + 'lists/');
  }

  getSharedItems(key, owner) {
      return this.afDatabase.list('lists/' + owner + '/' + key + '/items', {
        query: {
          orderByChild: 'rank'
        }
    })
  }

  deletelist(key) {
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('lists').once('value', (snapshot) => {
      snapshot.ref.child(key).remove();
    })
  }

  getintogroup(groupname) {
    if (groupname != null) {
      this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).once('value', (snapshot) => {
        if (snapshot.val() != null) {
          var temp = snapshot.val().members;
          this.currentgroup = [];
          for (var key in temp) {
            this.currentgroup.push(temp[key]);
          }
          this.currentgroupname = groupname;
          this.events.publish('gotintogroup');
        }
      })
    }
  }

  getownership(groupname) {
    var promise = new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).once('value', (snapshot) => {
        var temp = snapshot.val().creator;
        if (temp == firebase.auth().currentUser.uid) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  getgroupimage() {
    return new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).once('value', (snapshot) => {
        this.grouppic = snapshot.val().groupPic;
        resolve(true);
      })
    })

  }

  addmember(newmember) {
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('members').child(newmember.uid).set({
      photoURL: newmember.photoURL,
      displayName: newmember.displayName,
      uid: newmember.uid
    }).then(() => {
      this.getgroupimage().then(() => {
        this.firegroup.child(newmember.uid).child(this.currentgroupname).set({
          groupPic: this.grouppic,
          creator: firebase.auth().currentUser.uid
        }).catch((err) => {
          console.log(err);
        })
      })
      this.getintogroup(this.currentgroupname);
    })
  }

  deletemember(member) {

    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname)
      .child('members').child(member.uid).on('value', (snapshot) => {
        snapshot.ref.remove().then(() => {
          this.firegroup.child(member.uid).child(this.currentgroupname).remove().then(() => {
            this.getintogroup(this.currentgroupname);
          })
        })
      })

  }

  getgroupmembers() {

    this.firegroup.child(this.currentgroupname).once('value', (snapshot) => {
      var tempdata = snapshot.val().creator;
      this.firegroup.child(tempdata).child(this.currentgroupname).child('members').once('value', (snapshot) => {
        var tempvar = snapshot.val();
        this.firegroup.child(tempvar).once('value', (snapshot) => {
          for (var key in tempvar) {
            this.currentgroup.push(tempvar[key]);
          }
        })
      })
    })
    this.events.publish('gotmembers');
  }

  leavegroup() {
    return new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).once('value', (snapshot) => {
        var tempowner = snapshot.val().creator;
        this.firegroup.child(tempowner).child(this.currentgroupname).child('members').orderByChild('uid')
          .equalTo(firebase.auth().currentUser.uid).once('value', (snapshot) => {
            snapshot.ref.remove().then(() => {
              this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).remove().then(() => {
                resolve(true);
              }).catch((err) => {
                reject(err);
              })
            }).catch((err) => {
              reject(err);
            })
          })
      })
    })
  }
  deletegroup() {
    return new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('members').once('value', (snapshot) => {
        var tempmembers = snapshot.val();

        for (var key in tempmembers) {
          this.firegroup.child(tempmembers[key].uid).child(this.currentgroupname).remove();
        }

        this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).remove().then(() => {
          resolve(true);
        }).catch((err) => {
          reject(err);
        })

      })
    })
  }

}
