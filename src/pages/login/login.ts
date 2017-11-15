import { User } from './../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Profile } from '../../models/profile';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  profileData: FirebaseObjectObservable<Profile>
  user = {} as User;

  constructor(public navCtrl: NavController, private afDatabase: AngularFireDatabase, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


async login(user: User){
 try{ 
  const result = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
  if(result){
    this.profileData = this.afDatabase.object(`profile/${result.uid}`)
    console.log(result.uid);
    if(this.profileData){
      this.navCtrl.setRoot('TabsPage');
    } else{
      this.navCtrl.push('ProfilePage');
    }
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
