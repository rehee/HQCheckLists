import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { PropertyListPage } from '../properties/property-list/property-list';
import { LandingPage } from '../publics/landing/landing';
import { LogOffPage } from '../publics/log-off/log-off';
import { CoreFunction } from '../../core/core-function';
import { CleanCleanerJobsPage } from '../cleaning';
import { ReservationSelectPage } from '../reservation/reservation-select/reservation-select';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { EnumUserType } from '../../models/enums/enum-user-type';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PropertyListPage;
  tab2Root = ContactPage;
  tab3Root = LogOffPage;
  TabItems: any[] = [];
  UserRole: EnumUserType = null;
  constructor(public param: NavParams, public nav: NavController) {
    this.UserRole = param.get('userRole');
    this.TabItems = [];
    if (this.UserRole == null) {
      this.nav.push(LogOffPage);
    }
    switch (this.UserRole) {
      case EnumUserType.Admin:
        this.TabItems.push({
          page: PropertyListPage,
          title: "Home",
          icon: "home"
        });
        this.TabItems.push({
          page: ReservationSelectPage,
          title: "近期预定",
          icon: "clipboard"
        });
        break;
      case EnumUserType.Cleaner:
        this.TabItems.push({
          page: CleanCleanerJobsPage,
          title: "Jobs",
          icon: "contacts"
        });
        break;
      default:
        this.nav.push(LogOffPage);
        break;
    }
    this.TabItems.push({
      page: LogOffPage,
      title: "登出",
      icon: "power"
    });
  }

}
