import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the FinditemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-finditems',
  templateUrl: 'finditems.html',
})
export class FinditemsPage {

  scanData : {};
  options :BarcodeScannerOptions;
  
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinditemsPage');
  }

  manualAddItem() {
    this.navCtrl.push('ListsPage');
  }

  shop(){
    this.navCtrl.push('ShopPage');
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

}
