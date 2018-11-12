import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { Inventory } from '../../../models';
import { FileContain } from '../../../core/core-function';
import { ContentPostModel } from '../../../models/contents/content-pass';
import { AppFunctions } from '../../../config/app-function';
@Component({
  selector: 'page-inventory-create',
  templateUrl: 'inventory-create.html'
})
export class InventoryCreatePage {

  propertyId: string;
  inventoryId: string;
  constructor(public navCtrl: NavController, public param: NavParams, private ds: DataService) {
    this.propertyId = param.get("propertyId");
    this.inventoryId = param.get("inventoryId");
    this.Init();
  }
  model: ContentPostModel = new ContentPostModel();
  async Init() {
    AppFunctions.PresentLoader();
    if (!this.inventoryId && !this.propertyId) {
      this.navCtrl.pop();
    }
    if (this.propertyId) {
      let newResult = await this.ds.InventoryPreCreate(this.propertyId);
      if (newResult != null && newResult.Success) {
        this.model = newResult.Data;
      }
    }
    if (this.inventoryId) {
      let updateResult = await this.ds.InventoryPreUpdate(this.inventoryId);
      if (updateResult != null && updateResult.Success) {
        this.model = updateResult.Data;
      }
    }
    AppFunctions.DismissLoader();
  }

  Processing: boolean = false;
  async save() {
    if (!this.model.Name) {
      return;
    }
    if (this.Processing) {
      return;
    }
    this.Processing = true;
    AppFunctions.PresentLoader();
    if (this.propertyId) {
      let newResult = await this.ds.InventoryCreate(this.model);
      if (newResult != null && newResult.Success) {
        this.model = newResult.Data;
      }
    }
    if (this.inventoryId) {
      let updateResult = await this.ds.InventoryUpdate(this.model);
      if (updateResult != null && updateResult.Success) {
        this.model = updateResult.Data;
      }
    }
    this.navCtrl.pop();
    AppFunctions.DismissLoader();
  }
}
