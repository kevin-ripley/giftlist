import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { UserProvider } from '../../providers/user/user';



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider,
              public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }
 
  signUp() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.user.email == '' || this.user.password == '' || this.user.username == '' || this.user.firstName == '' || this.user.lastName == '' || this.user.birthDate == '') {
      toaster.setMessage('All Fields Are Required');
      toaster.present();
    }
    else if (this.user.password.length < 7) {
      toaster.setMessage('Password is not strong enough. You need more than six characters!');
      toaster.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Please wait'
      });
      loader.present();
      this.userservice.adduser(this.user).then((res: any) => {
        loader.dismiss();
        if (res.success)
          this.navCtrl.push('ProfilePage');
        else
          alert('Error' + res);
      })
    }
  }  
 
  goBack() {
    this.navCtrl.setRoot('LoginPage');
  }

}
