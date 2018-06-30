import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth, public alertCtrl: AlertController) {
    
  }
  login(newEmail: string, newPassword: string){
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword).then(() => {
        resolve(true);
      }).catch((err) => {
        let alert = this.alertCtrl.create({
          message: err.message,
          buttons: ['Ok']
        });
        alert.setTitle('Login Failed');
        alert.present();
        resolve(err);
      })
    })

    return promise;
    
  }

}
