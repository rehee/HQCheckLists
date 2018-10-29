import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { Inventory } from '../../../models';
import { InventoryCreatePage } from '../inventory-create/inventory-create';
@Component({
  selector: 'page-inventory-list',
  templateUrl: 'inventory-list.html'
})
export class InventoryListPage {

  constructor(public navCtrl: NavController, public param: NavParams, private ds: DataService) {

  }
  async Init() {
    if (!this.param.get("propertyId")) {
      return;
    }
    let result = await this.ds.GetInventoryByProperty(this.param.get("propertyId"));
    if (result != null) {
      this.Inventories = result.map(b => b);
    }
  }
  ionViewWillEnter() {
    this.Init();
  }
  Inventories: Inventory[] = [];
  Create() {
    this.navCtrl.push(InventoryCreatePage, { propertyId: this.param.get("propertyId") });
  }
}
