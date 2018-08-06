import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the IntroSliderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  finish: boolean = true

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.prev = false;
    this.next = true;
    this.finish = false;

    console.log('Intro Slider Page');

    this.data = {
      'toolBarTitle': 'Simple + icon',
      'btnFinish': 'Finish',
      'items': [
        {
          logo: '',
          iconSlider: 'icon-star-outline',
          title: 'Fragment Example 1',
          description: 'Text for Fragment Example 1 Duis aute irure dolor in reprehenderit'
        },
        {
          logo: '',
          iconSlider: 'icon-star-half',
          title: 'Fragment Example 2',
          description: 'Text for Fragment Example 2 Duis aute irure dolor in'
        },
        {
          logo: '',
          iconSlider: 'icon-star',
          title: 'Fragment Example 3',
          description: 'Text for Fragment Example 3 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
          buttonFinish: 'Finish'

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
