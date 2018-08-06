import { Component } from '@angular/core';
import { IonicPage, NavController, } from 'ionic-angular';
import { AdMobFreeBannerConfig, AdMobFree } from '@ionic-native/admob-free';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public backgroundImage: any = "assets/images/background_wlr.jpg";
  constructor(public navCtrl: NavController, public admob: AdMobFree) {
    this.showBanner();
  }

  showBanner() {
    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: false, // Remove in production
      autoShow: true,
      id: 'ca-app-pub-3508855280895987/3094770508'
    }; 
    this.admob.banner.config(bannerConfig);
    this.admob.banner.prepare().then(() => {
      // success
    }).catch(e => console.log(e));
  }

  manual() {
    this.navCtrl.push('ListCreatePage');
  }

  group() {
    this.navCtrl.push('GroupCreatePage');
  }

  items(){
    this.navCtrl.setRoot('ShopPage');
  }

  friends() {
    this.navCtrl.push('ChatsPage');
  }
  tutorials(){
    this.navCtrl.push('IntroSliderPage');
  }

}
