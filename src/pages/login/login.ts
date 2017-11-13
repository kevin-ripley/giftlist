import { User } from './../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


async login(user: User){
 try{ 
  const result = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
  if(result){
    this.navCtrl.setRoot('HomePage');
  }
 }
 catch(e){
   console.error(e);
 }
}

register(){
  this.navCtrl.push('RegisterPage');
}


}
