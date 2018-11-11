import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { ContentPostModel } from '../../../models/contents/content-pass';
import { ImageService } from '../../../services/image-service';
import { ContentProperty } from '../../../models/contents/content-property';

@Component({
  selector: 'cleaner-job-check-picture',
  templateUrl: 'cleaner-job-check-picture.html'
})
export class CleanerJobCheckPicturePage {
  CleaningPicture: ContentPostModel = new ContentPostModel();
  constructor(public navCtrl: NavController, public param: NavParams, public ds: DataService, public is: ImageService) {
    let cleaningPicture = param.get('cleaningPicture');
    if (!cleaningPicture) {
      navCtrl.pop();
    }
    this.CleaningPicture = cleaningPicture;
    console.log(cleaningPicture);
    this.Init();
  }

  async Init() {
  }
  async Save() {
    let image = this.CleaningPicture.Properties.find(b => b.Key == "Image");
    if (!image.File) {
      this.navCtrl.pop();
      return;
    }
    if (!this.CleaningPicture.Name) {
      this.CleaningPicture.Name = "同上";
    }
    if (!this.CleaningPicture.Id) {
      await this.ds.CleaningPictureCreate(this.CleaningPicture);
    } else {
      await this.ds.CleaningPictureUpdate(this.CleaningPicture);
    }
    this.navCtrl.pop();
  }

}
