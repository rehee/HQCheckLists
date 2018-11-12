import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContentPostModel } from '../../../models/contents/content-pass';
import { DataService } from '../../../services';
import { removeSummaryDuplicates, ReturnStatement } from '@angular/compiler';
import { AppFunctions } from '../../../config/app-function';

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
    AppFunctions.PresentLoader();
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
    AppFunctions.DismissLoader();
  }
  Processing: boolean = false;
  async Maintain() {
    if (!this.PropertyPass.Name) {
      return;
    }
    if (this.Processing) {
      return;
    }
    this.Processing = true;
    AppFunctions.PresentLoader();
    if (!this.PropertyId) {
      await this.ds.PropertCreate(this.PropertyPass);
      this.navCtrl.pop();
    } else {
      await this.ds.PropertyUpdate(this.PropertyPass);
      this.navCtrl.pop();
    }
    this.Processing = false;
    AppFunctions.DismissLoader();
  }

}
