import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { CleanerJob } from '../../../models/cleaning';
import { CleanCleanerJobsPage } from '../clean-cleaner-jobs/clean-cleaner-jobs';

@Component({
  selector: 'page-cleaner-job-detail',
  templateUrl: 'cleaner-job-detail.html'
})
export class CleanerJobDetailPage {

  CleaningId: string = "";
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
    console.log(result)
  }

}
