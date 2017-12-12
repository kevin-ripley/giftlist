import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: any;
  public backgroundImage: any = "../assets/images/gift_rt_bg.jpg";
  public imgLogo: any = "assets/images/christmas_logo.png";
  user = {} as User;

  constructor(public navCtrl: NavController, public authservice: AuthProvider, public fb: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  ionViewDidLoad() {
  }

  login() {
    if (!this.loginForm.valid) {
      //this.presentAlert('Username password can not be blank')
      console.log("error");
    } else {
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent',
        content: ''
      });
      loadingPopup.present();

      this.authservice.login(this.loginForm.value.email, this.loginForm.value.password).then((res: any) => {
        if (res == true) {
          loadingPopup.dismiss();
          this.navCtrl.setRoot('TabsPage');
        } else {
          loadingPopup.dismiss();
          this.navCtrl.setRoot('LoginPage');
        }
      })
    }
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  passwordreset() {
    this.navCtrl.push('PasswordResetPage');
  }

  presentAlert(title) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: ['OK']
    });
    alert.present();
  }



}
