import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { CleanerJob, CleaningView, Cleaning } from '../../../models/cleaning';
import { CleanCleanerJobsPage } from '../clean-cleaner-jobs/clean-cleaner-jobs';
import { Property } from '../../../models';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AppFunctions } from '../../../config/app-function';
import { ContentPostModel } from '../../../models/contents/content-pass';
import { ApiResponse } from '../../../models/ApiResponse';
import { ImageService } from '../../../services/image-service';

@Component({
  selector: 'cleaner-job-check-room',
  templateUrl: 'cleaner-job-check-room.html'
})
export class CleanerJobCheckRoomPage {
  CleaningJob: Cleaning = new Cleaning();
  Property: string = "";
  RoomPicId: string = "";
  RoomPicture: ContentPostModel = new ContentPostModel();
  constructor(public navCtrl: NavController, public param: NavParams, public ds: DataService, public is: ImageService) {
    let cleaning = param.get('cleaning');
    if (!cleaning) {
      navCtrl.pop();
    }
    this.CleaningJob = cleaning;
    this.Property = param.get('property');

    if (!this.Property) {
      navCtrl.pop();
    }
    this.RoomPicId = this.CleaningJob[this.Property];
    console.log(this.RoomPicId);
    this.Init();
  }

  async Init() {
    let preResult: ApiResponse<ContentPostModel>;
    if (this.RoomPicId) {
      preResult = await this.ds.CleaningPicturePreUpdate(this.RoomPicId);
      console.log(preResult);

    } else {
      preResult = await this.ds.CleaningPicturePreCreate(null);
    }
    if (!preResult || !preResult.Success) {
      return;
    }
    this.RoomPicture = preResult.Data;
  }
  async Save() {
    if (!this.RoomPicId) {
      let result = await this.ds.CleaningPictureCreate(this.RoomPicture);
      if (!result || !result.Success) {
        return;
      }
      this.CleaningJob.ImageCorridorId = result.Data.Id;
      await this.ds.CleaningUpdateBedChecking(this.CleaningJob);
    } else {
      await this.ds.CleaningPictureUpdate(this.RoomPicture);
      console.log(1);
    }

    this.navCtrl.pop();
  }
}
