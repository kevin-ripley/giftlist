import { ListItem } from './../../models/listItem';
import { GroupsProvider } from './../../providers/groups/groups';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ImagehandlerProvider } from '../../providers/imagehandler/imagehandler';
import { List } from '../../models/list';


@IonicPage()
@Component({
  selector: 'page-itemcreate',
  templateUrl: 'itemcreate.html',
})
export class ItemcreatePage {
  listItem = {} as ListItem;
  list: FirebaseObjectObservable<List>;
  key: any;
  name: any;
  loaded: boolean = false;
  rank: any;
  data = {
    "iconStars": [
      {
        "isActive": true,
        "iconActive": "icon-star-outline",
        "iconInactive": "icon-star"
      },
      {
        "isActive": true,
        "iconActive": "icon-star-outline",
        "iconInactive": "icon-star"
      },
      {
        "isActive": true,
        "iconActive": "icon-star-outline",
        "iconInactive": "icon-star"
      },
      {
        "isActive": true,
        "iconActive": "icon-star-outline",
        "iconInactive": "icon-star"
      },
      {
        "isActive": true,
        "iconActive": "icon-star-outline",
        "iconInactive": "icon-star"
      }
    ]
  };

  constructor(private groupService: GroupsProvider, private loadingCtrl: LoadingController, private zone: NgZone, private uploadImage: ImagehandlerProvider, public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseServiceProvider, public alertCtrl: AlertController) {
    this.key = this.navParams.get('key');
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();
    this.list = this.firebaseService.getSpecificList(this.key);
    this.list.subscribe((snapshots) => {
      this.name = snapshots.name;
    });
    this.listItem.image = 'https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/itemimages%2Fno_picture_available.png?alt=media&token=170ea64f-af20-41a2-b291-f4138103c2ae';
    loadingPopup.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemcreatePage');
    this.rank = 3;
  }
  uploadItem() {
    let alert = this.alertCtrl.create({
      title: 'Upload Image',
      message: 'Upload an Image of the Item',
      buttons: [
        {
          text: 'No Image To Upload',
          role: 'cancel',
          handler: () => {
            return;
          }
        },
        {
          text: 'Upload',
          handler: () => {
            let loader = this.loadingCtrl.create({
              content: 'Please wait...'
            })
            loader.present();

            this.uploadImage.selectImage()
              .then((data) => {
                this.listItem.image = data;
                this.uploadImage.uploadItemImage(this.listItem.image);
              });
            loader.dismiss();
            this.loaded = true;
          }
        }
      ]
    });
    alert.present();

  }
  onStarClass(items: any, index: number, e: any) {
    for (var i = 0; i < items.length; i++) {
      items[i].isActive = i <= index;
    }
    if (index == 4) {
      this.rank = 0;
    }
    if (index == 3) {
      this.rank = 1;
    }
    if (index == 2) {
      this.rank = 2;
    }
    if (index == 1) {
      this.rank = 3;
    }
    if (index == 0) {
      this.rank = 4;
    }
  };

  addItem() {
    
    this.listItem.rank = this.rank;
    console.log(this.key);
    this.firebaseService.addItem(this.key, this.listItem);
    this.navCtrl.setRoot('ListsPage');
  }
}
