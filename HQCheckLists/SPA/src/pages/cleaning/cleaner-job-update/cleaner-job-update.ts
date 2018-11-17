import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DataService } from '../../../services';
import { CleanerJob, CleaningView } from '../../../models/cleaning';
import { CleanCleanerJobsPage } from '../clean-cleaner-jobs/clean-cleaner-jobs';
import { Property } from '../../../models';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AppFunctions } from '../../../config/app-function';
import { CleanerJobCheckRoomPage } from '../cleaner-job-check-room/cleaner-job-check-room';
import { CleanerJobCheckPicturePage, CleanerJobCheckPicturesPage } from '..';

@Component({
  selector: 'page-cleaner-job-update',
  templateUrl: 'cleaner-job-update.html'
})
export class CleanerJobUpdatePage {

  CleaningId: string = "";
  CleaningData: CleaningView = new CleaningView();
  ThisProperty: Property = new Property();
  constructor(public navCtrl: NavController, public param: NavParams, public ds: DataService, public camera: Camera,
    public alertCtrl: AlertController) {
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
  async Save(complete: boolean = false) {
    AppFunctions.PresentLoader();
    await this.ds.CleaningUpdateBedChecking(this.CleaningData.CleaningRecord);
    for (let i = 0; i < this.CleaningData.Items.length; i++) {
      await this.ds.CleaningItemUpdateItem(this.CleaningData.Items[i]);
    }
    if (complete) {
      await this.ds.CleaningUpdateCompleteCleaning(this.CleaningId);
      this.navCtrl.pop();
    }
    AppFunctions.DismissLoader();
  }
  async CheckRoom(property: string) {
    this.navCtrl.push(CleanerJobCheckRoomPage, { cleaning: this.CleaningData.CleaningRecord, property: property });
  }
  async TakePic() {
    if (!this.CleaningId) {
      return;
    }
    let preCreate = await this.ds.CleaningPicturePreCreate(this.CleaningId);
    if (!preCreate || !preCreate.Success) {
      return;
    }
    this.navCtrl.push(CleanerJobCheckPicturePage, { cleaningPicture: preCreate.Data });
  }
  async Pictures() {
    this.navCtrl.push(CleanerJobCheckPicturesPage, { cleaningId: this.CleaningId });
  }
  Complete() {
    const confirm = this.alertCtrl.create({
      title: '完成检查',
      message: '确认完成检查. 完成后将无法再次修改',
      buttons: [
        {
          text: '取消',
          handler: () => {

          }
        },
        {
          text: '确认',
          handler: () => {
            this.Save(true);
          }
        }
      ]
    });
    confirm.present();
  }
}
