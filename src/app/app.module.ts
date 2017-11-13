import { SplashScreenLayout1 } from './../components/splash-screen/layout-1/splash-screen-layout-1';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { Network } from '@ionic-native/network';
import { SplashScreen } from '@ionic-native/splash-screen';

export const firebaseConfig = {
  apiKey: "AIzaSyCyuoAZIfoEZuEB5ZfOTmKFCEU-vqfqBE4",
  authDomain: "gift-list-58d8f.firebaseapp.com",
  databaseURL: "https://gift-list-58d8f.firebaseio.com",
  projectId: "gift-list-58d8f",
  storageBucket: "gift-list-58d8f.appspot.com",
  messagingSenderId: "498265981425"
};
@NgModule({
  declarations: [
    MyApp,
    SplashScreenLayout1
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SplashScreenLayout1
    
  ],
  providers: [
    StatusBar,
    Network,
    SplashScreen,
    SpinnerDialog,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
