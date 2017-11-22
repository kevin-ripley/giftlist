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
  loaded:boolean =  false;

  constructor(private loadingCtrl: LoadingController, private zone: NgZone, private uploadImage: ImagehandlerProvider, public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseServiceProvider, public alertCtrl: AlertController) {
    this.key = this.navParams.get('key');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemcreatePage');
  }
  uploadItem() {
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
          handler: () => {
            let loader = this.loadingCtrl.create({
              content: 'Please wait'
            })
            loader.present();
            
               this.uploadImage.selectImage()
               .then((data) =>
               {
                  this.imgurl = data;
                  this.uploadImage.uploadItemImage(this.imgurl);
               });
            loader.dismiss();
            this.loaded = true;

          }
        }
      ]
    });
    alert.present();

  }

  addItem() {
    if(this.listItem.image == undefined){
      this.listItem.image = 'https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itemimages%2Fdont-know-25547_1280.png?alt=media&token=9a68dc0d-a574-4ab9-8b47-9e32c3e5e215';
    } else{
      this.listItem.image = this.imgurl;
    }
    
    this.firebaseService.addItem(this.key, this.listItem);
    this.navCtrl.push('ListitemsPage', { key: this.key });
  }
}
