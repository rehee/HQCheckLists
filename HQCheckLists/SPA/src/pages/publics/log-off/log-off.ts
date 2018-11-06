import { Component } from '@angular/core';
import { NavController, NavOptions } from 'ionic-angular';
import { UserService } from '../../../services/user-service';
import { SiteInfo, SiteKey } from '../../../config/site-info';
import { LandingPage } from '../landing/landing';
import { AppFunctions } from '../../../config/app-function';


@Component({
  selector: 'page-log-off',
  templateUrl: 'log-off.html'
})
export class LogOffPage {

  constructor(public navCtrl: NavController, public userService: UserService) {
    AppFunctions.PresentLoader();
    this.refresh();
  }
  async refresh() {
    if (SiteInfo.OnConnect) {
      let user = await this.userService.LogOff();
      let currentUser = await SiteInfo.GetSiteValue(SiteKey.UserName);
      var v = this.navCtrl.getViews();
      var a = this.navCtrl['_app']['_rootNavs']['entries']().next(1);
      var nav = <NavController>a.value[1];
    } else {
      SiteInfo.SetSiteValue(SiteKey.UserName, null);
    }
    nav.setRoot(LandingPage);
    AppFunctions.DismissLoader();

  }
  ionViewWillLeave() {

  }

}
