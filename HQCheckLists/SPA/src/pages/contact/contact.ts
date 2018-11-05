import { Component } from '@angular/core';
import { NavController, NavOptions } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LandingPage } from '../publics/landing/landing';
import { UserService } from '../../services/user-service';
import { SiteInfo, SiteKey } from '../../config/site-info';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public userService: UserService) {
    this.refresh();
  }
  async refresh() {
    let user = await this.userService.LogOff();
    let currentUser = await SiteInfo.GetSiteValue(SiteKey.UserName);
    var v = this.navCtrl.getViews();
    var a = this.navCtrl['_app']['_rootNavs']['entries']().next(1);
    var nav = <NavController>a.value[1];
    nav.setRoot(LandingPage);

  }

}
