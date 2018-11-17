import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../../services';
import { CleanerJob, ClearJobItem } from '../../../models/cleaning';
import { EnumStatus } from '../../../models/enums/enum-status';
import { CleanerJobDetailPage } from '../cleaner-job-detail/cleaner-job-detail';
import { CleanerJobUpdatePage } from '..';

@Component({
  selector: 'page-clean-cleaner-jobs',
  templateUrl: 'clean-cleaner-jobs.html'
})
export class CleanCleanerJobsPage {

  Jobs: CleanerJob[] = [];
  constructor(public navCtrl: NavController, private ds: DataService) {

  }
  async Init() {
    let result = await this.ds.CleaningReadCleanerJob();
    if (!result || !result.Success) {
      return;
    }
    this.Jobs = result.Data.map(b => b);
  }
  GotoDetail(item: ClearJobItem) {
    if (item.Status == EnumStatus.Processing) {
      this.navCtrl.push(CleanerJobUpdatePage, { cleaningId: item.CleaningId })
    } else {
      this.navCtrl.push(CleanerJobDetailPage, { cleaningId: item.CleaningId })
    }
  }
  JobStatus(status: EnumStatus): string {
    switch (status) {
      case EnumStatus.Pending:
        return "未开始";
      case EnumStatus.Processing:
        return "正在打扫";
      case EnumStatus.Complete:
        return "完成打扫";
      case EnumStatus.Approving:
        return "已验收";
      default:
        return "";
    }
  }
  ionViewWillEnter() {
    this.Init();
  }
}
