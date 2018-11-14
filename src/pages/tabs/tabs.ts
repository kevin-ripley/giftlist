import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'ListsPage';
  tab3Root = 'GroupsPage';
  tab4Root = 'ChatsPage';


  constructor() {}

}
