import { WizardLayout1 } from './../components/wizard/layout-1/wizard-layout-1';
import { firebaseConfig } from './firebaseconfig';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { ProductsProvider } from './../providers/products/products';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Keyboard } from '@ionic-native/keyboard';
import { AdMobFree } from '@ionic-native/admob-free';
import { Deeplinks } from '@ionic-native/deeplinks';




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
    AdMobFree,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductsProvider,
    FirebaseServiceProvider,
    GroupsProvider,
    ImagehandlerProvider,
    AuthProvider,
    UserProvider,
    RequestsProvider,
    ChatProvider,
    Keyboard,
    SocialSharing,
    Deeplinks
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
