import { Deeplinks } from '@ionic-native/deeplinks';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  @ViewChild(Nav) navChild:Nav;

  constructor(public deeplinks: Deeplinks, public modalCtrl: ModalController, private afAuth: AngularFireAuth, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    this.afAuth.authState.subscribe(auth => {
      if(!auth)
        this.rootPage = 'WelcomePage';
      else
        this.rootPage = 'TabsPage';
    });
    platform.ready().then(() => {

      this.deeplinks.routeWithNavController(this.navChild, {
        '/lists/:userId/:key/items': 'ListItemsPage'
      }).subscribe((match) => {
        console.log('Successfully routed', match);
      }, (nomatch) => {
        console.log('Unmatched Route', nomatch);
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

