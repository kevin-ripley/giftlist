import { ImagehandlerProvider } from './../../providers/imagehandler/imagehandler';
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';

/**
 * Generated class for the GroupCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-create',
  templateUrl: 'group-create.html',
})
export class GroupCreatePage {

  newgroup = {
    groupName: 'GroupName',
    groupPic: "https://firebasestorage.googleapis.com/v0/b/gift-list-58d8f.appspot.com/o/default_group.png?alt=media&token=f81a22e4-4188-4b7d-a193-c3e48e55e496"
  }
  constructor(public groupservice: GroupsProvider,public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private imghandler: ImagehandlerProvider, private loadingCtrl: LoadingController) {
  }

  createGroup(){
    this.groupservice.addgroup(this.newgroup).then(() => {
      this.navCtrl.pop();
    }).catch((err) => {
      alert(err);
    })
  }

  editGroupName(){
    let alert = this.alertCtrl.create({
      title: 'Edit Group Name',
      inputs: [{
        name: 'groupName',
        placeholder: 'Give a new Group Name'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {

        }
      },
      {
        text: 'Set',
        handler: data => {
          if (data.groupName) {
            this.newgroup.groupName = data.groupName
          }

          else {
            this.newgroup.groupName = 'groupName';
          }
        }
      }
      ]
    });
    alert.present();
  }

  editImage(){
    
      if (this.newgroup.groupName == 'GroupName') {
        let namealert = this.alertCtrl.create({
          buttons: ['okay'],
          message: 'Please enter the groupname first. Thanks'
        });
        namealert.present();
      }
      else {
        let loader = this.loadingCtrl.create({
          content: 'Loading, please wait..'
        });
        loader.present();
        this.imghandler.grouppicstore(this.newgroup.groupName).then((res: any) => {
          loader.dismiss();
          if(res){
            this.newgroup.groupPic = res;
          }
        }).catch((err) => {
          alert(err);
        })
      }
      
    
  }

}
