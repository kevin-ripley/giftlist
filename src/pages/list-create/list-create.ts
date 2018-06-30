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
  traditional_christmas = "https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itembackgrounds%2Fchristmas.jpg?alt=media&token=95e3fcb7-3fe7-4682-811e-cfcf2fad592e";

  gift = "https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itembackgrounds%2Fgift_bg.jpg?alt=media&token=a2d94e43-e1a5-468f-9553-918aed847c8f";
  christmas = [this.silver_christmas, this.traditional_christmas, this.gift];

  rose_gift = "https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itembackgrounds%2Fgift-roses.jpg?alt=media&token=0623ea75-047b-4f8b-8e31-e2c99fdea0b6";
  flowers = "https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itembackgrounds%2Fwedding-flowers.jpg?alt=media&token=09d97bfc-2667-4667-97ea-a3bdf767484a";
  just_married = "https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itembackgrounds%2Fjust_married.jpg?alt=media&token=74008f3e-8490-4065-b1ad-bcaddc805f9c";
  confetti = "https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itembackgrounds%2Fwedding_confetti.jpg?alt=media&token=cb9ffca3-9c73-4a5a-86a5-66cc28ddebd0";
  table = "https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itembackgrounds%2Fwedding_table.jpg?alt=media&token=efa6ef8c-46ee-49fd-a1e2-b84689d16a27";
  wedding = [this.rose_gift, this.flowers, this.just_married, this.confetti, this.table];

  pineapple = "https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itembackgrounds%2Fpineapple-birthday.jpg?alt=media&token=55b38afe-3164-49d9-b2b6-e74f75b7e34a";
  balloons_sky = "https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itembackgrounds%2Fballoons_insky.jpg?alt=media&token=61f60c15-899d-4b92-8f30-c28c601583e4";
  balloons = "https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itembackgrounds%2Fbirthday.jpg?alt=media&token=53dc9e4f-e0f6-4041-ab7b-94e82667f957";
  birthday = [this.pineapple, this.balloons, this.balloons_sky];

  other = "https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itembackgrounds%2Fgift-lightblue.jpg?alt=media&token=7d788cee-cadf-43ad-bfbc-df0cf23d8bde"

  list = {} as List;
  listRef$: FirebaseListObservable<List[]>;
  imgurl = '';
  occasion: any;

  constructor(public navCtrl: NavController, private firebaseService: FirebaseServiceProvider) {
    this.listRef$ = this.firebaseService.getLists();
  }

  addList() {
    if (this.occasion == 'christmas') {
      var randomNum = Math.floor(Math.random() * this.christmas.length);
      this.imgurl = this.christmas[randomNum];
      this.list.image = this.imgurl;
    }
    if (this.occasion == 'wedding') {
      var randomNum = Math.floor(Math.random() * this.wedding.length);
      this.imgurl = this.wedding[randomNum];
      this.list.image = this.imgurl;
    }
    if (this.occasion == 'birthday') {
      var randomNum = Math.floor(Math.random() * this.birthday.length);
      this.imgurl = this.birthday[randomNum];
      this.list.image = this.imgurl;
    }
    if (this.occasion == 'other') {
      this.list.image = this.other;
    }
    this.firebaseService.addLists(this.list);
    this.navCtrl.setRoot('ListsPage');
  }


}
