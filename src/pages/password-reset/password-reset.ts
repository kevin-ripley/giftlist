import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { FormBuilder, Validators } from '@angular/forms';
/**
 * Generated class for the PasswordresetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {
  email: string;
  public resetPasswordForm;
  public backgroundImage: any = "assets/images/gift_rt_bg.jpg";
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public userservice: UserProvider, public alertCtrl: AlertController, public fb: FormBuilder,public loadingCtrl: LoadingController) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.resetPasswordForm = fb.group({
          email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
    });
  }


  reset() {
    if (!this.resetPasswordForm.valid){
      console.log("form is invalid = "+ this.resetPasswordForm.value);
  } else {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: ''
    });
    loadingPopup.present();
    this.userservice.passwordreset(this.resetPasswordForm.value.email)
    .then((user) => {
        loadingPopup.dismiss();
        this.presentAlert("We just sent you a reset link to your email");
        this.navCtrl.setRoot('LoginPage');
    }, (error) => {
        loadingPopup.dismiss();
        var errorMessage: string = error.message;
        this.presentAlert(errorMessage);
    });
  }
}

presentAlert(title) {
  let alert = this.alertCtrl.create({
    title: title,
    buttons: ['OK']
  });
  alert.present();
}

  goBack() {
    this.navCtrl.setRoot('LoginPage');
  }

}