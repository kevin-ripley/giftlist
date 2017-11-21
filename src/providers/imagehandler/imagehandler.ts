import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
/*
  Generated class for the ImagehandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImagehandlerProvider {
  public cameraImage: String

  constructor(
    private _CAMERA: Camera) {
  }


  selectImage(): Promise<any> {
    return new Promise(resolve => {
      let cameraOptions: CameraOptions = {
        sourceType: this._CAMERA.PictureSourceType.PHOTOLIBRARY,
        destinationType: this._CAMERA.DestinationType.DATA_URL,
        quality: 100,
        targetWidth: 320,
        targetHeight: 240,
        encodingType: this._CAMERA.EncodingType.JPEG,
        correctOrientation: true
      };

      this._CAMERA.getPicture(cameraOptions)
        .then((data) => {
          this.cameraImage = "data:image/jpeg;base64," + data;
          resolve(this.cameraImage);
        });


    });
  }

  uploadProfileImage(imageString): Promise<any> {
    let image: string = 'profile-' + new Date().getTime() + '.jpg',
      storageRef: any,
      parseUpload: any;

    return new Promise((resolve, reject) => {
      storageRef = firebase.storage().ref('profileimages/' + firebase.auth().currentUser.uid + '/' + image);
      parseUpload = storageRef.putString(imageString, 'data_url');

      parseUpload.on('state_changed', (_snapshot) => {
        // We could log the progress here IF necessary
        // console.log('snapshot progess ' + _snapshot);
      },
        (_err) => {
          reject(_err);
        },
        (success) => {
          resolve(parseUpload.snapshot);
        });
    });
  }

  uploadItemImage(imageString): Promise<any> {
    let image: string = 'item-' + new Date().getTime() + '.jpg',
      storageRef: any,
      parseUpload: any;

    return new Promise((resolve, reject) => {
      storageRef = firebase.storage().ref('itemimages/' + firebase.auth().currentUser.uid + '/' + image);
      parseUpload = storageRef.putString(imageString, 'data_url');

      parseUpload.on('state_changed', (_snapshot) => {
        // We could log the progress here IF necessary
        // console.log('snapshot progess ' + _snapshot);
      },
        (_err) => {
          reject(_err);
        },
        (success) => {
          resolve(parseUpload.snapshot);
        });
    });
  }

  groupPicStore(imageString, groupname): Promise<any> {
    let image: string = 'item-' + new Date().getTime() + '.jpg',
      storageRef: any,
      parseUpload: any;

    return new Promise((resolve, reject) => {
      storageRef = firebase.storage().ref('groupimages/' + firebase.auth().currentUser.uid + '/'+ groupname + '/' + image);
      parseUpload = storageRef.putString(imageString, 'data_url');

      parseUpload.on('state_changed', (_snapshot) => {
        // We could log the progress here IF necessary
        // console.log('snapshot progess ' + _snapshot);
      },
        (_err) => {
          reject(_err);
        },
        (success) => {
          resolve(parseUpload.snapshot);
        });
    });
  }



  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }


}
