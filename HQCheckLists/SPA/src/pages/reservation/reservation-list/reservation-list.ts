import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { Reservation } from '../../../models/reservation';
import { ReservationMaintainPage } from '../reservation-maintain/reservation-maintain';
import { CleaningMaintainPage } from '../../cleaning';

@Component({
  selector: 'page-reservation-list',
  templateUrl: 'reservation-list.html'
})
export class ReservationListPage {

  PropertyId: string;
  Reservations: Reservation[] = [];
  constructor(public navCtrl: NavController, public ds: DataService, public param: NavParams) {
    this.PropertyId = param.get('propertyId');
  }
  async Init() {
    if (!this.PropertyId) {
      return;
    }
    let result = await this.ds.ReservationRead(this.PropertyId);
    console.log(result);
    if (result == null || !result.Success) {
      return;
    }
    this.Reservations = result.Data.map(b => b);
  }
  ionViewWillEnter() {
    this.Init();
  }
  Create() {
    this.navCtrl.push(ReservationMaintainPage, { propertyId: this.PropertyId });
  }
  Maintain(reservationId: string) {
    this.navCtrl.push(ReservationMaintainPage, { reservationId: reservationId });
  }
  CreateCleaning(r: Reservation) {
    this.navCtrl.push(CleaningMaintainPage, { reservationId: r.Id, propertyId: r.PropertyId });
  }
}
