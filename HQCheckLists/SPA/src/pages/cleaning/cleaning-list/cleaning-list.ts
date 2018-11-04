import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { Cleaning } from '../../../models/cleaning';
import { CleaningMaintainPage } from '../cleaning-maintain/cleaning-maintain';
import { ContentPostModel } from '../../../models/contents/content-pass';

@Component({
  selector: 'page-cleaning-list',
  templateUrl: 'cleaning-list.html'
})
export class CleaningListPage {

  PropertyId: string = "";
  Model: Cleaning[] = [];
  constructor(public navCtrl: NavController, public ds: DataService, public param: NavParams) {
  }
  ionViewWillEnter() {
    this.PropertyId = this.param.get('propertyId');
    this.Init();
  }
  async Init() {
    let result = await this.ds.CleaningReadByPropertyId(this.PropertyId);
    if (!result || !result.Success) {
      return;
    }
    this.Model = result.Data.map(b => b);

  }
  Maintain(cleaningId: string) {
    this.navCtrl.push(CleaningMaintainPage, { cleaningId: cleaningId });
  }
}
