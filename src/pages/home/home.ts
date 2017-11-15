import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Profile } from '../../models/profile';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  profileData: FirebaseObjectObservable<Profile>
  scanData : {};
  options :BarcodeScannerOptions;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private toast: ToastController,public modalCtrl: ModalController, private barcodeScanner: BarcodeScanner) {
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data =>{
      if(data.email && data.uid){
      this.toast.create({
      message: `Welcome to Gift List!`,
      duration: 3000
    }).present();

    this.profileData = this.afDatabase.object(`profile/${data.uid}`)
    console.log(this.profileData)

  } else{
    this.toast.create({
      message: `Could Not Find Auth Details`,
      duration: 3000
    }).present();
  }
  });
  
  }
  scan(){
    this.options = {
      prompt : "Scan your Wish! "
  }
  this.barcodeScanner.scan(this.options).then((barcodeData) => {
      this.scanData = barcodeData.text;
      
      let itemModal = this.modalCtrl.create('ScannedPage', { scanData: this.scanData });
      itemModal.present();

  }, (err) => {
      console.log("Error occured : " + err);
  });      
  }

  shop(){
    let itemModal = this.navCtrl.push('ShopPage');
    
  }

}
