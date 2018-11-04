import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../../services';

@Component({
  selector: 'page-clean-item-maintain',
  templateUrl: 'clean-item-maintain.html'
})
export class CleanItemMaintainPage {

  constructor(public navCtrl: NavController, private ds: DataService) {
    this.Init();
  }
  async Init() {

  }
}
