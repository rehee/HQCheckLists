import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { ContentPostModel } from '../../../models/contents/content-pass';

@Component({
  selector: 'page-reservation-maintain',
  templateUrl: 'reservation-maintain.html'
})
export class ReservationMaintainPage {
  PropertyId: string = "";
  ReservationId: string = "";
  Model: ContentPostModel = new ContentPostModel();
  constructor(public navCtrl: NavController, public ds: DataService, public param: NavParams) {
    this.PropertyId = param.get('propertyId');
    this.ReservationId = param.get('reservationId');
    this.Init();
  }
  async Init() {
    if (!this.PropertyId && !this.ReservationId) {
      return;
    }
    if (!!this.PropertyId) {
      let createResult = await this.ds.ReservationPreCreate(this.PropertyId);
      if (!createResult || !createResult.Success) {
        return;
      }

      this.Model = createResult.Data;
    }
    if (!!this.ReservationId) {
      let updateResult = await this.ds.ReservationPreUpdate(this.ReservationId);
      if (!updateResult || !updateResult.Success) {
        return;
      }
      this.Model = updateResult.Data;
    }
  }
  async Maintain() {
    if (!this.Model) {
      return;
    }
    if (!this.PropertyId && !this.ReservationId) {
      return;
    }
    if (!!this.PropertyId) {
      let createResult = await this.ds.ReservationCreate(this.Model);
      if (!createResult || !createResult.Success) {
        return;
      }
      this.Model = createResult.Data;
    }
    if (!!this.ReservationId) {
      let updateResult = await this.ds.ReservationUpdate(this.Model);
      if (!updateResult || !updateResult.Success) {
        return;
      }
      this.Model = updateResult.Data;
    }
    this.navCtrl.pop();
  }
}
