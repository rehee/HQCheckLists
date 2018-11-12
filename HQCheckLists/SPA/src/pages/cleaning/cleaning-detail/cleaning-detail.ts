import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { DataService } from '../../../services';
import { Cleaning, CleaningItem, CleaningPicture } from '../../../models/cleaning';
import { AppFunctions } from '../../../config/app-function';

@Component({
  selector: 'page-cleaning-detail',
  templateUrl: 'cleaning-detail.html'
})
export class CleaningDetailPage {

  ReservationId: string;
  CleaningId: string;
  Model: Cleaning = new Cleaning();
  Items: CleaningItem[] = [];
  CleaningPics: CleaningPicture[] = [];
  RoomPicturs: CleaningPicture[] = [];

  constructor(public navCtrl: NavController, public ds: DataService, public param: NavParams) {
    this.ReservationId = param.get('reservationId');
    this.CleaningId = param.get('cleaningId');
    AppFunctions.PresentLoader();
    this.Init().then(() => {
      AppFunctions.DismissLoader();
    }).catch(() => {
      AppFunctions.DismissLoader();
    });
  }
  async Init() {
    if (!this.ReservationId && !this.CleaningId) {
      this.navCtrl.pop();
      return;
    }
    if (this.CleaningId) {
      let cleaning = await this.ds.CleaningReadByCleaningId(this.CleaningId);
      if (cleaning != null && cleaning.Success) {
        this.Model = cleaning.Data.CleaningRecord;
        this.Items = cleaning.Data.Items.map(b => b);
      }
    }
    if (this.ReservationId && !this.CleaningId) {
      let reservation = await this.ds.CleaningReadByReservationId(this.ReservationId);
      if (reservation != null && reservation.Success) {
        this.Model = reservation.Data;
        this.CleaningId = this.Model.Id;
        let cleaning = await this.ds.CleaningReadByCleaningId(this.CleaningId);
        if (cleaning != null && cleaning.Success) {
          this.Model = cleaning.Data.CleaningRecord;
          this.Items = cleaning.Data.Items.map(b => b);
        }
      }
    }
    let cleaningImage = await this.ds.CleaningPictureReadByCleaningId(this.CleaningId);
    if (cleaningImage != null && cleaningImage.Success) {
      this.CleaningPics = cleaningImage.Data.map(b => b);
    }
    let rooms = AppFunctions.GetRoomPicture();
    this.RoomPicturs = [];
    rooms.forEach(b => {
      let id = this.Model[b.Property];
      if (!id) {
        let newPic = new CleaningPicture();
        newPic['Title'] = b.Title;
        this.RoomPicturs.push(newPic);
      } else {
        this.ds.CleaningPictureReadByCleaningPicId(id).then(p => {
          if (p == null || !p.Success) {
            let newPic = new CleaningPicture();
            newPic['Title'] = b.Title;
            this.RoomPicturs.push(newPic);
          } else {
            let pic = p.Data;
            pic['Title'] = b.Title;
            this.RoomPicturs.push(pic);
          }
        }).catch(() => {
          let newPic = new CleaningPicture();
          newPic['Title'] = b.Title;
          this.RoomPicturs.push(newPic);
        })
      }
    })
  }
}
