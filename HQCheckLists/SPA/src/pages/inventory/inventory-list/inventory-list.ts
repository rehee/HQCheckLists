import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { DataService } from '../../../services';
import { Inventory } from '../../../models';
import { InventoryCreatePage } from '../inventory-create/inventory-create';
import { InventoryDetailPage } from '../inventory-detail/inventory-detail';
@Component({
  selector: 'page-inventory-list',
  templateUrl: 'inventory-list.html'
})
export class InventoryListPage {

  constructor(public navCtrl: NavController, public modelCtrl: ModalController, public param: NavParams, private ds: DataService, private alertCtrl: AlertController) {

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
  random(){
    return Math.random();
  }
  InventoryModel(inventory: Inventory) {
    let profileModal = this.modelCtrl.create(InventoryDetailPage, inventory);
    profileModal.present();
  }
  NumberUpdate(inventory: Inventory) {
    let alert = this.alertCtrl.create({
      title: `更新 ${inventory.Name} 数量`,
      inputs: [
        {
          name: 'QTY',
          placeholder: '数量',
          value: !inventory.QTY ? "0" : `${inventory.QTY}`,
          type: !inventory.IsPercentage ? 'number' : 'range'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '更新',
          handler: data => {
            inventory.QTY = Number(data['QTY']);
            this.ds.UpdatePropertyInventory(inventory, []);
          }
        }
      ]
    });
    alert.present();
  }
}
