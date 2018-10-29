import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { Inventory } from '../../../models';
import { FileContain } from '../../../core/core-function';
@Component({
  selector: 'page-inventory-detail',
  templateUrl: 'inventory-detail.html'
})
export class InventoryDetailPage {

  constructor(public navCtrl: NavController, public param: NavParams, private ds: DataService) {
    this.Model = new Inventory();
  }
  async Init() {
    if (!this.param.get('Id')) {
      this.navCtrl.pop();
    }
    this.Model = this.param.data;
  }
  ionViewWillEnter() {
    this.Init();
  }
  Model: Inventory = null;
  save() {
    this.ds.UpdatePropertyInventory(this.Model, this.Files);
    this.navCtrl.pop();
  }
  Files: FileContain[] = [];
  FileChange(input: any, filename: any) {
    let check = this.Files.filter(b => b.FileName == filename);
    if (check.length <= 0) {
      this.Files.push(new FileContain(filename, input.target.files[0]));
    }
    else {
      check[0].File = input.target.files[0];
    }
  }
}
