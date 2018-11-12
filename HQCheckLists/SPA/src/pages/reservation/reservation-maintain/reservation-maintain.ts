import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { DataService } from '../../../services';
import { ContentPostModel } from '../../../models/contents/content-pass';
import { AppFunctions } from '../../../config/app-function';

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
    AppFunctions.PresentLoader();
    if (!this.PropertyId && !this.ReservationId) {
      this.navCtrl.pop();
    }
    if (this.PropertyId) {
      let createResult = await this.ds.ReservationPreCreate(this.PropertyId);
      if (!createResult || !createResult.Success) {
        this.navCtrl.pop();
      }
      this.Model = createResult.Data;
    }
    if (this.ReservationId) {
      let updateResult = await this.ds.ReservationPreUpdate(this.ReservationId);
      if (!updateResult || !updateResult.Success) {
        this.navCtrl.pop();
      }
      this.Model = updateResult.Data;
    }
    AppFunctions.DismissLoader();
  }
  Processing: boolean = false;
  async Maintain() {
    if (!this.Model || !this.Model.Name) {
      return;
    }
    if (!this.PropertyId && !this.ReservationId) {
      return;
    }
    if (this.Processing) {
      return;
    }
    this.Processing = true;
    AppFunctions.PresentLoader();
    if (!!this.PropertyId) {
      let createResult = await this.ds.ReservationCreate(this.Model);
      if (!createResult || !createResult.Success) {
        AppFunctions.DismissLoader();
        this.navCtrl.pop();
        return;
      }
      this.Model = createResult.Data;
    }
    if (!!this.ReservationId) {
      let updateResult = await this.ds.ReservationUpdate(this.Model);
      if (!updateResult || !updateResult.Success) {
        AppFunctions.DismissLoader();
        this.navCtrl.pop();
        return;
      }
      this.Model = updateResult.Data;
    }
    AppFunctions.DismissLoader();
    this.navCtrl.pop();
  }
}
