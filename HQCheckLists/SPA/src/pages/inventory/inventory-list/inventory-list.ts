import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { DataService } from '../../../services';
import { Inventory } from '../../../models';
import { InventoryCreatePage } from '../inventory-create/inventory-create';
import { InventoryDetailPage } from '../inventory-detail/inventory-detail';
import { AppFunctions } from '../../../config/app-function';
@Component({
  selector: 'page-inventory-list',
  templateUrl: 'inventory-list.html'
})
export class InventoryListPage {

  propertyId: string;
  constructor(public navCtrl: NavController, public modelCtrl: ModalController, public param: NavParams, private ds: DataService, private alertCtrl: AlertController) {

  }
  async Init() {
    this.propertyId = this.param.get("propertyId");
    if (!this.propertyId) {
      return;
    }
    AppFunctions.PresentLoader();
    let result = await this.ds.InventoryRead(this.propertyId);
    AppFunctions.DismissLoader();
    if (result == null || result.Success != true) {
      return;
    }
    this.Inventories = result.Data.map(b => b);

  }
  ionViewWillEnter() {
    this.Init();
  }
  Inventories: Inventory[] = [];
  Create() {
    this.navCtrl.push(InventoryCreatePage, { propertyId: this.propertyId });
  }
  random() {
    return Math.random();
  }
  InventoryModel(inventory: Inventory) {
    let profileModal = this.modelCtrl.create(InventoryCreatePage, { inventoryId: inventory.Id });
    profileModal.present();
    profileModal.onDidDismiss(b => {
      this.Init();
    });
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

          }
        },
        {
          text: '更新',
          handler: data => {
            //
            // this.ds.UpdatePropertyInventory(inventory, []);
            this.ds.InventoryUpdateQty(inventory.Id, data['QTY']).then(b => {
              if (b == null || b.Success != true) {
                return;
              }
              inventory.QTY = Number(data['QTY']);
            })
          }
        }
      ]
    });
    alert.present();
  }
}
