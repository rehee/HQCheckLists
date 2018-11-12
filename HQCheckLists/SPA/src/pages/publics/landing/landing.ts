import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DataService } from '../../../services';
import { SiteInfo, SiteKey } from '../../../config/site-info';
import { LoginViewModel } from '../../../models/users/login-model';
import { UserService } from '../../../services/user-service';
import { TabsPage } from '../../tabs/tabs';
import { EnumUserType } from '../../../models/enums/enum-user-type';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { SocialSharing } from '@ionic-native/social-sharing';
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {

  constructor(public navCtrl: NavController, public ds: DataService, public userService: UserService, public alertCtrl: AlertController,
    private photoLibrary: PhotoLibrary, private socialSharing: SocialSharing
  ) {
    this.Init();
    this.photoLibrary.requestAuthorization({
      "read": true,
      "write": true
    }).then(() => {
      window['cordova']['plugins']['photoLibrary']['getLibrary'](f=>{
        window['cordova']['plugins']['photoLibrary']['saveImage']('https://i.stack.imgur.com/9Khwe.jpg','myapp',()=>{
          alert(1);
        },()=>{alert(2)})
      })
      // this.photoLibrary.saveImage("https://i.stack.imgur.com/9Khwe.jpg", "MyApp").then(() => { alert(1) }).catch(b => alert(b));
      // this.photoLibrary.getLibrary().subscribe({

      //   next: library => {
      //     library.forEach(function(libraryItem) {
      //       console.log(libraryItem.id);          // ID of the photo
      //       console.log(libraryItem.photoURL);    // Cross-platform access to photo
      //       console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
      //       console.log(libraryItem.fileName);
      //       console.log(libraryItem.width);
      //       console.log(libraryItem.height);
      //       console.log(libraryItem.creationDate);
      //       console.log(libraryItem.latitude);
      //       console.log(libraryItem.longitude);
      //       console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
      //     });
      //   },
      //   error: err => { alert('could not get photos'); },
      //   complete: () => { alert('done getting photos'); }
      // });

      // this.photoLibrary.getLibrary()
    })
      .catch(err => alert('permissions weren\'t granted'));
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
  New() {
    window.open("https://www.w3schools.com");
  }
  async Logout() {
    let result = await SiteInfo.GetUserType();
    console.log(result == EnumUserType.Admin);
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
              console.log(user);
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
