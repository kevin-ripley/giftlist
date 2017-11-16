import { List } from './../../models/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';


@IonicPage()
@Component({
  selector: 'page-list-create',
  templateUrl: 'list-create.html',
})
export class ListCreatePage {

  list = {} as List;
  listRef$: FirebaseListObservable<List[]>;

  constructor(public navCtrl: NavController, private firebaseService: FirebaseServiceProvider) {
    this.listRef$ = this.firebaseService.getLists();
  }

  addList(){
    this.firebaseService.addLists(this.list);
    this.navCtrl.push('ListsPage');
  }


}
