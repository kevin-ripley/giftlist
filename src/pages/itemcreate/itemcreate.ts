import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ListItem } from '../../models/listItem';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ImagehandlerProvider } from '../../providers/imagehandler/imagehandler';

/**
 * Generated class for the ItemcreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-itemcreate',
  templateUrl: 'itemcreate.html',
})
export class ItemcreatePage {
  listItem = {} as ListItem;
  key: any;
  imgurl: '';
  moveon: true|boolean;

  constructor(private loadingCtrl: LoadingController,private zone: NgZone,private uploadImage: ImagehandlerProvider, public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseServiceProvider, public alertCtrl: AlertController) {
    this.key = this.navParams.get('key');
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemcreatePage');
  }

  addItem(){
    let alert = this.alertCtrl.create({
      title: 'Upload Image',
      message: 'Upload an Image of the Item',
      buttons: [
        {
          text: 'Not Today',
          role: 'cancel',
          handler: () => {
            return;
          }
        },
        {
          text: 'Upload',
          handler: () => {let loader = this.loadingCtrl.create({
            content: 'Please wait'
          })
          loader.present();
          this.uploadImage.uploadItemImage().then((uploadedurl: any) => {
            loader.dismiss();
            this.zone.run(() => {
              this.imgurl = uploadedurl;
              this.moveon = false;
            })
          })
            
          }
        }
      ]
    });
    alert.present();
    
    this.listItem.image = this.imgurl;
    console.log(this.listItem);
      this.firebaseService.addItem(this.listItem);
      this.navCtrl.push('ListitemsPage');
    
  }
}
