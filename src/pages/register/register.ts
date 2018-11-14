import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Profile } from '../../models/profile';
import { FormBuilder, Validators } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as Profile;
  public registerForm;
  public backgroundImage: any = "assets/images/simple_bg.jpg";
  constructor(public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.registerForm = fb.group({
      username: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      firstName: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      lastName: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],

    });
  }

  register() {
    if (!this.registerForm.valid){
      console.log(this.registerForm.value);
      this.presentAlert("Please Re-Enter Information");
    } else {

     this.user.displayName =  this.registerForm.value.username;
     this.user.email = this.registerForm.value.email;
     this.user.firstName = this.registerForm.value.firstName;
     this.user.lastName = this.registerForm.value.lastName; 
     this.user.password = this.registerForm.value.password;
     

      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent', 
        content: 'Creating..'
      });
      loadingPopup.present();
      this.userservice.adduser(this.user).then(() => {
        loadingPopup.dismiss();
          this.navCtrl.push('ProfilePicturePage');
      }).catch((err) => {
        loadingPopup.dismiss();
        let alert = this.alertCtrl.create({
          message: err.message,
          buttons: [
            {
             text: 'Ok',
             role: 'cancel'
            }
          ]
        });
        alert.setTitle('Registration Failed');
        alert.present();
        
      })
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
