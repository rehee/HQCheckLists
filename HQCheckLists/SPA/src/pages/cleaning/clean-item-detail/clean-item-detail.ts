import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../../services';

@Component({
  selector: 'page-clean-item-detail',
  templateUrl: 'clean-item-detail.html'
})
export class CleanItemDetailPage {

  constructor(public navCtrl: NavController, private ds: DataService) {
    this.Init();
  }
  async Init() {

  }
}
