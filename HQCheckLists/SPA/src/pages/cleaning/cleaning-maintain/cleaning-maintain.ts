import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { ContentPostModel } from '../../../models/contents/content-pass';
import { SelectItem } from '../../../models/contents/select-item';
import { ContentProperty } from '../../../models/contents/content-property';
import { EnumStatus } from '../../../models/enums/enum-status';
import { CoreFunction } from '../../../core/core-function';
import { AppFunctions } from '../../../config/app-function';

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

  CleanerProperty: ContentProperty = new ContentProperty();
  StatusProperty: ContentProperty = new ContentProperty();

  CleanSelects: SelectItem[] = [];
  StatusSelects: SelectItem[] = [];

  constructor(public navCtrl: NavController, private ds: DataService, public param: NavParams) {
    this.PropertyId = this.param.get('propertyId');
    this.ReservationId = this.param.get('reservationId');
    this.CleaningId = this.param.get('cleaningId');

    for (let s in EnumStatus) {
      if (isNaN(Number(s))) {
        this.StatusSelects.push(new SelectItem(String(s), String(s)));
      }
    }
    this.Init();
  }
  async Init() {
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
    let cleanerProperty = this.Model.Properties.filter(b => b.Key == "CleanerId");
    if (cleanerProperty.length > 0) {
      this.CleanerProperty = cleanerProperty[0];
    }
    let statusProperty = this.Model.Properties.filter(b => b.Key == "Status");
    if (statusProperty.length > 0) {
      this.StatusProperty = statusProperty[0];
    }


    this.CleanItemPostModels();
    var users = await this.ds.UserReadAllCleaner(true);
    if (!!users && users.Success) {
      this.CleanSelects = users.Data.map(b => new SelectItem(b.Id, b.UserName));
    }
    this.IsWorking = false;
  }
  IsWorking = false;
  async Maintain() {
    if (this.IsWorking) {
      return;
    }
    this.IsWorking = true;
    if (!this.CleaningId) {
      AppFunctions.PresentLoader();
      let createResult = await this.ds.CleaningCreate(this.Model);
      AppFunctions.DismissLoader();
      if (!createResult && !createResult.Success) {
        this.IsWorking = false;
        return;
      }
      this.CleaningId = createResult.Data.Id;
      this.Init();
    } else {
      let updateResult = await this.ds.CleaningUpdate(this.Model);
      if (!updateResult || !updateResult.Success) {
        this.IsWorking = false;
        return;
      }
      this.ItemCount = this.CleanItems.length - 1;
      this.CheckLoop();
      this.CleanItems.forEach(async b => {
        await this.ds.CleaningItemUpdate(b);
        this.ItemCount--;
      });

    }
  }
  ItemCount = 0;
  async CheckLoop() {
    AppFunctions.PresentLoader();
    do {
      await CoreFunction.Delay(1000);
    } while (this.ItemCount > 0)
    AppFunctions.DismissLoader();
    this.Init();
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
