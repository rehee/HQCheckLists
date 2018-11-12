import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../../services';
import { CleaningItem, CleaningPicture } from '../../../models/cleaning';

@Component({
  selector: 'clean-picture-detail',
  templateUrl: 'clean-picture-detail.html'
})
export class CleanPictureDetailPage {
  @Input() Item: CleaningPicture = new CleaningPicture();
  @Input() Title: string = "";
  constructor(public navCtrl: NavController, private ds: DataService) {

  }

}
