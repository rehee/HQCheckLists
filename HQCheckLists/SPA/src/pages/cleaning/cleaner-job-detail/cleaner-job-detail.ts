import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { CleanerJob, CleaningView } from '../../../models/cleaning';
import { CleanCleanerJobsPage } from '../clean-cleaner-jobs/clean-cleaner-jobs';
import { Property } from '../../../models';
import { CleanerJobUpdatePage } from '../cleaner-job-update/cleaner-job-update';
import { EnumStatus } from '../../../models/enums/enum-status';

@Component({
  selector: 'page-cleaner-job-detail',
  templateUrl: 'cleaner-job-detail.html'
})
export class CleanerJobDetailPage {

  CleaningId: string = "";
  CleaningData: CleaningView = new CleaningView();
  ThisProperty: Property = new Property();
  constructor(public navCtrl: NavController, public param: NavParams, public ds: DataService) {
    this.CleaningId = param.get("cleaningId");
    if (!this.CleaningId) {
      if (this.navCtrl.canGoBack) {
        this.navCtrl.pop();
        return;
      } else {
        this.navCtrl.setRoot(CleanCleanerJobsPage);
      }
    }
    this.Init();
  }
  async Init() {
    let result = await this.ds.CleaningReadByCleaningId(this.CleaningId);
    if (!result || !result.Success || !result.Data) {
      return;
    }
    this.CleaningData = result.Data;
    var propertyResult = await this.ds.PropertyReadById(this.CleaningData.CleaningRecord.PropertyId);
    if (!propertyResult || !propertyResult.Success || !propertyResult.Data) {
      return;
    }
    this.ThisProperty = propertyResult.Data;
  }
  IsPending(): boolean {
    return this.CleaningData.CleaningRecord.Status == EnumStatus.Pending;
  }
  async Start() {
    let result = await this.ds.CleaningUpdateStartCleaning(this.CleaningId);
    if (!result || !result.Success) {
      return;
    }
    this.navCtrl.pop();
    this.navCtrl.push(CleanerJobUpdatePage, { cleaningId: this.CleaningId });
  }
}
