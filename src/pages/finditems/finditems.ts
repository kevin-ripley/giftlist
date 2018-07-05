import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { List } from '../../models/list';


@IonicPage()
@Component({
  selector: 'page-finditems',
  templateUrl: 'finditems.html',
})
export class FinditemsPage {

  scanData: {};
  options: BarcodeScannerOptions;
  public backgroundImage1: any = "assets/images/manual.jpg";
  public backgroundImage2: any = "assets/images/search.jpg";
  public backgroundImage3: any = "assets/images/scan.jpg";
  lists: FirebaseListObservable<List[]>;
  testRadioOpen = false;
  testRadioResult: any;
  key: Array<any> = [];
  name: any;



  constructor(public alertCtrl: AlertController, public firebaseService: FirebaseServiceProvider, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();
    loadingPopup.dismiss();
  }

  ionViewDidLoad() {
    this.lists = this.firebaseService.getLists();
    this.lists.subscribe(list => {
      //Item Will Be In Array and Loop Through
      list.forEach(temp => {
        var templist = {
          key: temp.$key,
          name: temp.name
        }
        this.key.push(templist);
      });
    });
  }

  //Future Method For Searching via Brands Like 'Nike,Adidas,Apple,Motorola,etc'
  brandSearch() {
    let profileModal = this.modalCtrl.create('BrandsearchPage');
    profileModal.present();
  }

  //Add Item To A List Manually
  manualAddItem() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose A List To Add Item');
    for (var k in this.key) {
      alert.addInput({
        type: 'radio',
        label: this.key[k].name,
        value: this.key[k].key,
      });
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.navCtrl.push('ItemcreatePage', { key: this.testRadioResult });
      }
    });
    alert.present();

  }

  shop() {
    this.navCtrl.push('ShopPage');
  }

  //Scan A Barcode to Add Item to A List
  scan() {
    this.options = {
      prompt: "Go Ahead And Scan Your Item! "
    }
    
    this.barcodeScanner.scan(this.options).then((barcodeData) => {
      this.scanData = barcodeData.text;
      this.navCtrl.push('ScannedPage', { scanData: this.scanData });
    }, (err) => {
      console.log("Error occured : " + err);
    });
  }

}
