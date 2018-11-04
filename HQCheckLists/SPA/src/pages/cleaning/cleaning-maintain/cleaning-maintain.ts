import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { ContentPostModel } from '../../../models/contents/content-pass';

@Component({
  selector: 'page-cleaning-maintain',
  templateUrl: 'cleaning-maintain.html'
})
export class CleaningMaintainPage {

  PropertyId: string;
  ReservationId: string;
  CleaningId: string;
  Model: ContentPostModel = new ContentPostModel();
  CleanItems: ContentPostModel[] = [];

  constructor(public navCtrl: NavController, private ds: DataService, public param: NavParams) {
    this.PropertyId = this.param.get('propertyId');
    this.ReservationId = this.param.get('reservationId');
    this.CleaningId = this.param.get('cleaningId');
    this.Init();
  }
  async Init() {
    console.log(this.CleaningId);
    if (!this.CleaningId) {
      let createResponse = await this.ds.CleaningPreCreate(this.PropertyId, this.ReservationId);
      if (!createResponse || !createResponse.Success) {
        return;
      }
      this.Model = createResponse.Data;
    } else {
      let updateResponse = await this.ds.CleaningPreUpdate(this.CleaningId);
      if (!updateResponse || !updateResponse.Success) {
        return;
      }
      this.Model = updateResponse.Data;
    }
    this.CleanItemPostModels();
  }

  async Maintain() {
    if (!this.CleaningId) {
      let createResult = await this.ds.CleaningCreate(this.Model);
      console.log(createResult);
    } else {
      let updateResult = await this.ds.CleaningUpdate(this.Model);
      console.log(updateResult);
    }
  }

  async CleanItemPostModels() {
    if (!this.CleaningId) {
      return;
    }
    let result = await this.ds.CleaningItemReadPostModel(this.CleaningId);
    if (!result || !result.Success) {
      return;
    }
    this.CleanItems = result.Data.map(b => b);
  }
}
