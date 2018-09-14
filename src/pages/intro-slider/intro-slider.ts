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
    this.prev = false;
    this.next = true;
    this.finish = false;

    console.log('Intro Slider Page');

    this.data = {
      'toolBarTitle': 'Big image',
            'btnNext': 'Next',
            'btnFinish': 'Finish',
            'items': [
                {
                    backgroundImage: 'assets/images/avatar-large/1.jpg',
                    title: 'Add A List and Add an Item to the List'
                },
                {
                    backgroundImage: 'assets/images/avatar-large/2.jpg',
                    title: 'Add Friends, Create Groups, and Share your List'
                },
                {
                    backgroundImage: 'assets/images/avatar-large/3.jpg',
                    title: 'Also Share via Twitter, Facebook, Messaging, etc.'
                }
            ]
    };
    this.events = {
      'onFinish': function (event: any) {
        console.log('Finish');
      }
    };
  }

  


  changeSlide(index: number): void {
    if (index > 0) {
      this.slider.lockSwipes(false);
      this.slider.slideNext(300);
      this.slider.lockSwipes(true);
    } else {
      this.slider.slidePrev(300);
    }
  }

  slideHasChanged(index: number): void {
    try {
      this.prev = !this.slider.isBeginning();
      this.next = this.slider.getActiveIndex() < (this.slider.length() - 1);
      this.finish = this.slider.isEnd();
    } catch (e) { }
  }

  ngOnChanges(changes: { [propKey: string]: any }) {
    this.data = changes['data'].currentValue;
  }

  onEvent(event: string) {
    if (this.events[event]) {
      this.events[event]();
    }
    console.log(event);
  }

}
