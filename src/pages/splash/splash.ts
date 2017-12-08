import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';


@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
  params: any = {};
  constructor(public viewCtrl: ViewController, public splashScreen: SplashScreen, public navCtrl: NavController, public navParams: NavParams) {
    this.params.data = {
      "duration": 10000,
      "logo": 'assets/images/logo/logo_gl.png',
      "title": 'assets/images/logo/title.png'
    }

    this.params.events = {
      "onRedirect": function () {
        navCtrl.pop();
      } 
    };
  }

  ionViewDidEnter() {
    
       this.splashScreen.hide();
    
       setTimeout(() => {
         this.viewCtrl.dismiss();
       }, 4000);
    
     }


}
