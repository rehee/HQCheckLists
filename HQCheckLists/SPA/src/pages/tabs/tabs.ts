import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { PropertyListPage } from '../properties/property-list/property-list';
import { LandingPage } from '../publics/landing/landing';
import { LogOffPage } from '../publics/log-off/log-off';
import { CoreFunction } from '../../core/core-function';
import { CleanCleanerJobsPage } from '../cleaning';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PropertyListPage;
  tab2Root = ContactPage;
  tab3Root = LogOffPage;
  TabItems: any[] = [];
  constructor() {
    // this.TabItems.push(
    //   {
    //     page: PropertyListPage,
    //     title: "Home",
    //     icon: "home"
    //   }
    // );
  }
  async ionViewWillEnter() {
    console.log('will enter');
    console.log(2)
    await CoreFunction.Delay(1000);
    this.TabItems.push({
      page: CleanCleanerJobsPage,
      title: "Jobs",
      icon: "contacts"
    });
    this.TabItems.push({
      page: PropertyListPage,
      title: "Home3",
      icon: "contacts"
    });
  }
}
