import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../../services';
import { CleaningItem } from '../../../models/cleaning';
@Component({
  selector: 'page-clean-item-detail',
  templateUrl: 'clean-item-detail.html'
})
export class CleanItemDetailPage {
  @Input() Item: CleaningItem = new CleaningItem();
  constructor(public navCtrl: NavController) {

  }


}
