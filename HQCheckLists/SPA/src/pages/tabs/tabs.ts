import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { PropertyListPage } from '../properties/property-list/property-list';
import { LandingPage } from '../publics/landing/landing';
import { LogOffPage } from '../publics/log-off/log-off';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PropertyListPage;
  tab2Root = ContactPage;
  tab3Root = LogOffPage;
  TabItems: any[] = [];
  constructor() {
    console.log(1);
    this.TabItems.push(
      {
        page: PropertyListPage,
        title: "Home",
        icon: "home"
      }
    );
  }
  ionViewWillEnter() {
    console.log('will enter');
    console.log(2) 
    this.TabItems.push({
      page: PropertyListPage,
      title: "Home2",
      icon: "contacts"
    }); 
    this.TabItems.push({
      page: PropertyListPage,
      title: "Home3",
      icon: "contacts"
    }); 
  }
}
