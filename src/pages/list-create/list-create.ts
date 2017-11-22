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
  silver_christmas = "https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itembackgrounds%2Fchristmas-silver.jpg?alt=media&token=221606cb-21bd-47e3-be5f-66079fbd8ced";
  traditional_christmas ="https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itembackgrounds%2Fchristmas.jpg?alt=media&token=95e3fcb7-3fe7-4682-811e-cfcf2fad592e";
  lightblue_gift = "https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itembackgrounds%2Fgift-lightblue.jpg?alt=media&token=7d788cee-cadf-43ad-bfbc-df0cf23d8bde";
  rose_gift = "https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itembackgrounds%2Fgift-roses.jpg?alt=media&token=0623ea75-047b-4f8b-8e31-e2c99fdea0b6";
  gift = "https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itembackgrounds%2Fgift_bg.jpg?alt=media&token=a2d94e43-e1a5-468f-9553-918aed847c8f";

  myPix = [this.silver_christmas,this.traditional_christmas, this.lightblue_gift, this.rose_gift, this.gift];
  list = {} as List;
  listRef$: FirebaseListObservable<List[]>;
  imgurl = '';

  constructor(public navCtrl: NavController, private firebaseService: FirebaseServiceProvider) {
    this.listRef$ = this.firebaseService.getLists();
  }

  addList(){
    var randomNum = Math.floor(Math.random() * this.myPix.length);
    this.imgurl = this.myPix[randomNum];
    this.list.image = this.imgurl;
    this.firebaseService.addLists(this.list);
    this.navCtrl.push('ListsPage');
  }


}
