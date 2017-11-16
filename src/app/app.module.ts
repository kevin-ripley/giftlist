import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { ProductsProvider } from './../providers/products/products';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { Network } from '@ionic-native/network';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { GroupsProvider } from '../providers/groups/groups';
import { ImagehandlerProvider } from '../providers/imagehandler/imagehandler';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';





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
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    Network,
    File,
    FileChooser,
    FilePath,
    SplashScreen,
    SpinnerDialog,
    BarcodeScanner,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductsProvider,
    FirebaseServiceProvider,
    GroupsProvider,
    ImagehandlerProvider,
    AuthProvider,
    UserProvider
  ]
})
export class AppModule {}
