import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../../services';

@Component({
  selector: 'page-clean-item-list',
  templateUrl: 'clean-item-list.html'
})
export class CleanItemListPage {

  constructor(public navCtrl: NavController, private ds: DataService) {
    this.Init();
  }
  async Init() {

  }
}
