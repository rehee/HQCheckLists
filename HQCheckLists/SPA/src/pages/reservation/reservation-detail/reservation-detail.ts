import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../../services';

@Component({
  selector: 'page-reservation-detail',
  templateUrl: 'reservation-detail.html'
})
export class ReservationDetailPage {

  constructor(public navCtrl: NavController, private ds: DataService) {
    this.Init();
  }
  async Init() {

  }
}
