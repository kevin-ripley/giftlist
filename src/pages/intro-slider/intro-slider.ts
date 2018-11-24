import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-intro-slider',
  templateUrl: 'intro-slider.html',
})
export class IntroSliderPage {
  data: any = {};
  events: any = {};

  @ViewChild('wizardSlider') slider: Slides;
  sliderOptions = { pager: true };
  path: boolean = false;
  prev: boolean = true;
  next: boolean = true;
  finish: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
        
  }

  goToHome(){
    this.navCtrl.pop();
  }

}
