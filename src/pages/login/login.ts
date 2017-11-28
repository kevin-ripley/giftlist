import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let loader = this.loadingCtrl.create({
      content: "Signing In...",
    });
    loader.present();
    this.authservice.login(this.user).then((res: any) => {
      if (!res.code){
        loader.dismiss();
        this.navCtrl.setRoot('TabsPage');
      }
      else{
        this.navCtrl.push('LoginPage');
        loader.dismiss();
      }
    })
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  passwordreset() {
    this.navCtrl.push('PasswordResetPage');
  }



}
