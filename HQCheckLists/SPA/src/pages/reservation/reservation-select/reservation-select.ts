import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../../services';
import { CoreFunction } from '../../../core/core-function';
import { ReservationSummaryDate, Reservation } from '../../../models/reservation';
import { AppFunctions } from '../../../config/app-function';
import { PropertycreatePage } from '../../properties/property-create/property-create';
import { ReservationMaintainPage } from '..';
import { CleaningMaintainPage, CleaningDetailPage } from '../../cleaning';

@Component({
  selector: 'page-reservation-select',
  templateUrl: 'reservation-select.html'
})
export class ReservationSelectPage {

  constructor(public navCtrl: NavController, private ds: DataService) {

  }
  BookLength: string = '1';
  async Init() {
    this.Lists()
  }
  List: ReservationSummaryDate[] = [];
  async Lists() {
    AppFunctions.PresentLoader();
    var result = await this.ds.ReservationReadByTimeLength(this.BookLength);
    AppFunctions.DismissLoader();
    if (result == null || !result.Success) {
      this.List = [];
    }
    this.List = result.Data.map(b => b);
  }
  GoToProperty(propertyId: string) {
    if (!propertyId) {
      return;
    }
    this.navCtrl.push(PropertycreatePage, { PropertyId: propertyId });
  }
  GoToReserve(reserveId: string) {
    if (!reserveId) {
      return;
    }
    this.navCtrl.push(ReservationMaintainPage, { reservationId: reserveId });
  }
  GoToCleaningDetail(cleaningId: string) {
    if (!cleaningId) {
      return;
    }
    this.navCtrl.push(CleaningDetailPage, { cleaningId: cleaningId });
  }
  GoToCleaning(r: Reservation, cleaningId: string) {
    if (cleaningId) {
      this.navCtrl.push(CleaningMaintainPage, { cleaningId: cleaningId });
      return;
    }
    if (r) {
      this.navCtrl.push(CleaningMaintainPage, { reservationId: r.Id, propertyId: r.PropertyId });
      return;
    }
    return;
  }
  ionViewWillEnter() {
    this.Init();
  }
}
