import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../../services';

@Component({
  selector: 'page-cleaning-detail',
  templateUrl: 'cleaning-detail.html'
})
export class CleaningDetailPage {

  constructor(public navCtrl: NavController, private ds: DataService) {
    this.Init();
  }
  async Init() {

  }
}
