import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  scanData : {};
  options :BarcodeScannerOptions;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private barcodeScanner: BarcodeScanner) {
  }

  
  scan(){
  //   this.options = {
  //     prompt : "Scan your Wish! "
  // }
  // this.barcodeScanner.scan(this.options).then((barcodeData) => {
      //this.scanData = barcodeData.text;
      this.scanData = '885909919796';
      let itemModal = this.modalCtrl.create('ScannedPage', { scanData: this.scanData });
      itemModal.present();

  // }, (err) => {
  //     console.log("Error occured : " + err);
  // });      
  }

  shop(){
    this.navCtrl.push('ShopPage');
  }

  manual(){
    this.navCtrl.push('ListCreatePage');
  }

  logout(){
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot('LoginPage');
  }

}
