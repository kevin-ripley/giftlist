import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user: User){
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
    console.log(result);
    this.navCtrl.push('LoginPage');
    }
    catch(e){
      console.error(e);
    }
  }

  cancel(){
    this.navCtrl.push('LoginPage');
  }

}
