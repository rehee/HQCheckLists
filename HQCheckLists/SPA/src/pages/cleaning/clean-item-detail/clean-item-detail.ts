import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../../services';
import { CleaningItem } from '../../../models/cleaning';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
@Component({
  selector: 'page-clean-item-detail',
  templateUrl: 'clean-item-detail.html'
})
export class CleanItemDetailPage {
  @Input() Item: CleaningItem = new CleaningItem();
  constructor(public navCtrl: NavController, private ds: DataService, public ss: SocialSharing) {

  }

  Share() {
    this.ss.saveToPhotoAlbum("aa");
  }

}
