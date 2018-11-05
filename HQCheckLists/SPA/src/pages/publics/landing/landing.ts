import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DataService } from '../../../services';
import { SiteInfo, SiteKey } from '../../../config/site-info';
import { LoginViewModel } from '../../../models/users/login-model';
import { UserService } from '../../../services/user-service';
import { TabsPage } from '../../tabs/tabs';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {

  constructor(public navCtrl: NavController, public ds: DataService, public userService: UserService, public alertCtrl: AlertController) {
    // this.Init();
  }
  async Init() {
    let currentUser = await SiteInfo.GetSiteValue(SiteKey.UserName);
    console.log(currentUser);
    if (currentUser == null || currentUser == "") {
      this.presentPrompt();
    } else {
      this.home();
    }
  }
  async Logout() {
    let user = await this.userService.LogOff();
    console.log(user);
    let currentUser = await SiteInfo.GetSiteValue(SiteKey.UserName);
    console.log(currentUser);

  }
  home() {
    this.navCtrl.push(TabsPage);
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
          handler: () => {
          }
        },
        {
          text: 'Login',
          handler: (data) => {
            let userLogin = new LoginViewModel();
            userLogin.Login = data['username'];
            userLogin.Password = data['password'];
            let loginF = async () => {
              let user = await SiteInfo.GetSiteValue(SiteKey.UserName);
              if (!user) {
                this.presentPrompt();
              } else {
                this.home();
              }
            }
            this.userService.LoginAndCheck(userLogin).then(
              () => {
                loginF();
              }
            ).catch(
              () => {
                loginF();
              }
            );
          }
        }
      ]
    });
    alert.present();
  }

}
