import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { Inventory } from '../../../models';
import { FileContain } from '../../../core/core-function';
@Component({
  selector: 'page-inventory-create',
  templateUrl: 'inventory-create.html'
})
export class InventoryCreatePage {

  constructor(public navCtrl: NavController, public param: NavParams, private ds: DataService) {

  }
  async Init() {
    if (!this.param.get("propertyId")) {
      this.navCtrl.pop();
    }
    this.Model = new Inventory();
    this.Model.ParentId = this.param.get("propertyId");
  }
  @ViewChild('fileInput') fileInput;
  ionViewWillEnter() {
    this.Init();
  }
  Model: Inventory = null;
  save() {
    this.Model.ImageUpload = this.fileInput;
    this.ds.CreatePropertyInventory(this.Model, this.Files);
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
