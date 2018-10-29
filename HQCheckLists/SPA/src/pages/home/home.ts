import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private ds: DataService) {
    this.Init();
  }
  async Init() {
    let result = await this.ds.GetAllProperties();
    console.log(result);
    if (result != null) {
      for (let p of result) {
        let inventory = await this.ds.GetInventoryByProperty(p.Id);
        console.log(inventory);
      }
    }
  }

}
