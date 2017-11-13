import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private toast: ToastController) {
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data =>{
      if(data.email && data.uid){
      this.toast.create({
      message: `Welcome to Gift List, ${data.email}`,
      duration: 3000
    }).present();
  } else{
    this.toast.create({
      message: `Could Not Find Auth Details`,
      duration: 3000
    }).present();
  }
  });

  
  }

}
