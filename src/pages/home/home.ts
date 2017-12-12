import { Component } from '@angular/core';
import { IonicPage, NavController, } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public backgroundImage: any = "../assets/images/gift_rt_bg.jpg";
  constructor(public navCtrl: NavController) {
    
  }

  manual() {
    this.navCtrl.push('ListCreatePage');
  }

  group() {
    this.navCtrl.push('GroupCreatePage');
  }
  friends() {
    this.navCtrl.push('ChatsPage');
  }

}
