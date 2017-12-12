import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(public modalCtrl: ModalController, private afAuth: AngularFireAuth, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.afAuth.authState.subscribe(auth => {
      if(!auth)
        this.rootPage = 'WelcomePage';
      else
        this.rootPage = 'TabsPage';
    });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.show();
      // let splash = this.modalCtrl.create('SplashPage');
      // splash.present();
      
    });
  }
}

