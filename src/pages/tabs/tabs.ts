import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'GroupsPage';
  tab3Root = 'ListsPage';
  tab4Root = 'FinditemsPage';
  tab5Root = 'ChatsPage';


  constructor() {}

}
