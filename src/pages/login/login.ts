import { User } from './../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(public navCtrl: NavController, private afDatabase: AngularFireDatabase, public navParams: NavParams, private authService: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


 login(){
  this.authService.login(this.user).then((res: any) => {
    if (!res.code)
      this.navCtrl.setRoot('TabsPage');
    else
      alert(res);
  })
 }
 catch(e){
   console.error(e);
 }

register(){
  this.navCtrl.push('RegisterPage');
}
passwordreset() {
  this.navCtrl.push('PasswordResetPage');
}


}
