import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { Reservation } from '../../../models/reservation';
import { ReservationMaintainPage } from '../reservation-maintain/reservation-maintain';
import { CleaningMaintainPage, CleaningDetailPage } from '../../cleaning';

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
    if (result == null || !result.Success) {
      return;
    }
    this.Reservations = result.Data.map(b => {
      this.CheckCleaningForReservation(b);
      return b;
    });
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

  async CheckCleaningForReservation(r: Reservation) {
    if (!!r && !!r.Id) {
      let cleaning = await this.ds.CleaningReadByReservationId(r.Id);
      if (!!cleaning && cleaning.Success) {
        r.CleaningRecord = cleaning.Data;
      }
    }
  }

  async MaintainCleaning(r: Reservation) {
    if (!!r && !!r.CleaningRecord && r.CleaningRecord.Id) {
      this.navCtrl.push(CleaningMaintainPage, { cleaningId: r.CleaningRecord.Id });
      return;
    }
    this.navCtrl.push(CleaningMaintainPage, { reservationId: r.Id, propertyId: r.PropertyId });
  }

  CleaningDetail(r: Reservation) {
    this.navCtrl.push(CleaningDetailPage, { reservationId: r.Id });
  }
}
