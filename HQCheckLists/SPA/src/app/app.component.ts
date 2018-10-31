import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LandingPage } from '../pages/publics/landing/landing';
import { Storage } from '@ionic/storage';
import { SiteInfo } from '../config/site-info';
import { UserService } from '../services/user-service';
import { Network } from '@ionic-native/network';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, private userService: UserService, private network: Network) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.storage.ready().then(b => {
        SiteInfo.SetStorage(this.storage, this.userService);
        this.network.onConnect().subscribe(b => {
          SiteInfo.OnConnect = true;
        });
        this.network.onDisconnect().subscribe(b => {
          SiteInfo.OnConnect = false;
        });
        this.rootPage = LandingPage;
        splashScreen.hide();
      })
    });
  }
}
