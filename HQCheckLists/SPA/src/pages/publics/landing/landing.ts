import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DataService } from '../../../services';
import { SiteInfo, SiteKey } from '../../../config/site-info';
import { LoginViewModel } from '../../../models/users/login-model';
import { UserService } from '../../../services/user-service';
import { EnumPages } from '../../../models/access/enum-pages';
import { ContentPostModel } from '../../../models/contents/content-pass';
import { HomePage } from '../../home/home';
import { PropertyPage } from '../../property/property';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {

  constructor(public navCtrl: NavController, public ds: DataService, public userService: UserService, public alertCtrl: AlertController) {
    this.Init();
  }
  async Init() {
    let premodel = await this.ds.PreCreateProperty();
    if (premodel.Data != null) {
      this.AAA = premodel.Data;
    }
    let canAccess = await this.userService.CanAccessCheck(EnumPages.PropertyCreate);
    console.log(canAccess);
    let currentUser = await SiteInfo.GetSiteValue(SiteKey.UserName);
    console.log(currentUser);
    if (currentUser == null || currentUser == "") {
      // this.presentPrompt();
    }
  }
  async Logout() {
    let user = await this.userService.LogOff();
    console.log(user);
  }
  AAA: ContentPostModel = new ContentPostModel();
  async check() {
    console.log(this.AAA);
    let response = await this.ds.PostModel(this.AAA);
  }
  home() {
    this.navCtrl.push(PropertyPage);
  }
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {

          }
        },
        {
          text: 'Login',
          handler: (data) => {
            let userLogin = new LoginViewModel();
            userLogin.Login = data['username'];
            userLogin.Password = data['password'];
            this.userService.LoginAndCheck(userLogin).then(
              (b) => {
                console.log(b);
              }
            ).catch(
              () => {
                console.log("error");
              }
            );
          }
        }
      ]
    });
    alert.present();
  }

}
