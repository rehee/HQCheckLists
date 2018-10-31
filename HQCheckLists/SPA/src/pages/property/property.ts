import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../services';
import { Property } from '../../models';
import { InventoryListPage } from '../inventory/inventory-list/inventory-list';

@Component({
  selector: 'page-property',
  templateUrl: 'property.html'
})
export class PropertyPage {

  constructor(public navCtrl: NavController, private ds: DataService) {

  }
  async Init() {
    let result = await this.ds.GetAllProperties();
    if (result == null || result.Success == false) {
      return;
    }
    this.Properties = result.Data.map(b => b);
  }
  Properties: Property[] = [];
  @ViewChild('fileInput') fileInput;
  GoToInventory(propertyId: string) {
    console.log(propertyId);
    this.navCtrl.push(InventoryListPage, { propertyId: propertyId });
  }
  ionViewDidLoad() {
    console.log(1);
  }
  ionViewWillEnter() {
    this.Init();
  }
  files: any = {};
  save() {
    console.log(this.fileInput);
  }
}
