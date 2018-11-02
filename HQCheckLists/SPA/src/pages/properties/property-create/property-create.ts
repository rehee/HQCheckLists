import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContentPostModel } from '../../../models/contents/content-pass';
import { DataService } from '../../../services';
import { removeSummaryDuplicates } from '@angular/compiler';

@Component({
  selector: 'page-property-create',
  templateUrl: 'property-create.html'
})
export class PropertycreatePage {

  PropertyId: string = "";
  PropertyPass: ContentPostModel = new ContentPostModel();
  constructor(public navCtrl: NavController, public param: NavParams, public ds: DataService) {
    this.PropertyId = !param.get("PropertyId") ? "" : param.get("PropertyId");
    this.init();
  }

  async init() {
    if (!this.PropertyId) {
      let result = await this.ds.PropertyPreCreate();
      if (result == null || !result.Success) {
        this.navCtrl.pop();
      }
      this.PropertyPass = result.Data;
    } else {
      let updateResult = await this.ds.PropertyPreUpdate(this.PropertyId);
      if (updateResult == null || !updateResult.Success) {
        this.navCtrl.pop();
      }
      this.PropertyPass = updateResult.Data;
    }
  }

  async Maintain() {
    if (!this.PropertyId) {
      await this.ds.PropertCreate(this.PropertyPass);
      this.navCtrl.pop();
    } else {
      await this.ds.PropertyUpdate(this.PropertyPass);
      this.navCtrl.pop();
    }
  }
}
