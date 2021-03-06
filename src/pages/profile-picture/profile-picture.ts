import { ImagehandlerProvider } from './../../providers/imagehandler/imagehandler';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-profile-picture',
  templateUrl: 'profile-picture.html',
})
export class ProfilePicturePage {
  imgurl = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  moveon: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public imgservice: ImagehandlerProvider,
    public zone: NgZone, public userservice: UserProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfilepicPage');
  }

  selectImage() {
    
    this.imgservice.selectImage()
      .then((data) => {
        this.imgservice.uploadProfileImage(data).then((snapshot : any) => {
          this.imgurl = snapshot.downloadURL;
          this.userservice.updateimage(this.imgurl).then((res: any) => {
            if (res.success) {
              this.navCtrl.setRoot('HomePage');
            }
          }).catch((err) => {
            console.log(JSON.stringify(err));
          })
        });
         
        })
        
    this.moveon = false;
  } 


  updateproceed() {
    let loader = this.loadingCtrl.create({
      content: `uploading`
    })
    loader.present();

    this.userservice.updateimage(this.imgurl).then((res: any) => {
      loader.dismiss();   
      if (res.success) {
        this.navCtrl.setRoot('HomePage');
      }
      else {
        loader.dismiss();
        alert(res);
      }
    })
  }

  proceed() {
    this.navCtrl.setRoot('HomePage');
  }

}
