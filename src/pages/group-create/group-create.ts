import { ImagehandlerProvider } from './../../providers/imagehandler/imagehandler';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-group-create',
  templateUrl: 'group-create.html',
})
export class GroupCreatePage {
  public groupNameForm;
  public backgroundImage: any = "assets/images/groups.png";
  newgroup = {
    groupName: 'GroupName',
    groupPic: this.backgroundImage
  }
  constructor(public fb: FormBuilder, public groupservice: GroupsProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private imghandler: ImagehandlerProvider, private loadingCtrl: LoadingController) {
    this.groupNameForm = fb.group({
      groupName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]+[0-9]{2,4}')])]
    });
  }

  createGroup() {
    if (!this.groupNameForm.valid) {
      console.log(this.groupNameForm.value);
      this.presentAlert("Invalid Group Name. Ex: GroupName18");
    } else {
      this.newgroup.groupName = this.groupNameForm.value.groupName;
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Creating...'
      });
      loadingPopup.present();
      this.groupservice.addgroup(this.newgroup).then(() => {
        this.navCtrl.pop();
        loadingPopup.dismiss();
      }).catch((err) => {
        alert(err);
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

  editImage() {
    let loader = this.loadingCtrl.create({
      content: 'Loading, Please Wait..'
    });
    loader.present();
    this.imghandler.selectImage()
      .then((data) => {
        this.imghandler.groupPicStore(this.newgroup.groupName, data);
        if (data) {
          this.newgroup.groupPic = data;
        }
      });
    loader.dismiss();
  }



}
