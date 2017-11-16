import { List } from './../../models/list';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import 'rxjs/add/operator/map';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {

  constructor(public afDatabase: AngularFireDatabase) {

  }

  getLists() {
    return this.afDatabase.list('lists');
  }

  addLists(list: List) {
    this.afDatabase.list('lists/').push(list);
  }

  removeLists(id) {
    this.afDatabase.list('lists/').remove(id);
  }
}
