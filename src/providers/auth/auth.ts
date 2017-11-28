import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';


@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth, public alertCtrl: AlertController) {
    
  }
  login(user: User) {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(() => {
        resolve(true);
      }).catch((err) => {
        let alert = this.alertCtrl.create({
          buttons: ['Ok']
        });
        alert.setTitle('Login Failed');
        alert.setSubTitle(err);
        alert.present();
        resolve(err);
      })
    })

    return promise;
    
  }

}
