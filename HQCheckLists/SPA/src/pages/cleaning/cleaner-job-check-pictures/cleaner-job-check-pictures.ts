import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DataService } from '../../../services';
import { ContentPostModel } from '../../../models/contents/content-pass';
import { ImageService } from '../../../services/image-service';
import { CleaningPicture } from '../../../models/cleaning';
import { CleanerJobCheckPicturePage } from '..';

@Component({
  selector: 'cleaner-job-check-pictures',
  templateUrl: 'cleaner-job-check-pictures.html'
})
export class CleanerJobCheckPicturesPage {
  CleaningId: string = "";
  CleaningPictures: CleaningPicture[] = [];
  constructor(public navCtrl: NavController, public param: NavParams, public ds: DataService, public is: ImageService,
    public alertCtrl: AlertController) {
  }

  async Init() {
    let result = await this.ds.CleaningPictureReadByCleaningId(this.CleaningId);
    if (!result || !result.Success) {
      return;
    }
    this.CleaningPictures = result.Data.map(b => b);
  }
  async Detail(cleaningPicId: string) {
    let result = await this.ds.CleaningPicturePreUpdate(cleaningPicId);
    if (!result || !result.Success) {
      return
    }
    this.navCtrl.push(CleanerJobCheckPicturePage, { cleaningPicture: result.Data });
  }
  async Save() {

    this.navCtrl.pop();
  }

  Delete(picture: CleaningPicture) {
    this.showConfirm(picture)
  }
  showConfirm(picture: CleaningPicture) {
    const confirm = this.alertCtrl.create({
      title: '确认删除图片?',
      message: '确认删除此图片么,删除图片将无法恢复?',
      buttons: [
        {
          text: '取消',
          handler: () => {

          }
        },
        {
          text: '确认',
          handler: async () => {
            await this.ds.CleaningPictureDelete(picture);
            this.Init();
          }
        }
      ]
    });
    confirm.present();
  }
  ionViewWillEnter() {
    let cleaningId = this.param.get("cleaningId");
    if (!cleaningId) {
      this.navCtrl.pop();
      return;
    }
    this.CleaningId = cleaningId;
    this.Init();
  }
}
