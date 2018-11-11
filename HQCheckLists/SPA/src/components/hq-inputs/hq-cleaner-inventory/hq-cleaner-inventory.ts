import { Component, Input } from '@angular/core';
import { Cleaning, CleaningItem } from '../../../models/cleaning';
import { FileContain } from '../../../core/core-function';

@Component({
  selector: 'hq-cleaner-inventory',
  templateUrl: 'hq-cleaner-inventory.html'
})
export class HQCleanerInventory {
  @Input() Item: CleaningItem = new CleaningItem();
  UploadFile: FileContain = null;
  Value() {
    return this.Item.ActuallyNumber;
  }
  Add() {
    if (this.Item.ActuallyNumber >= this.Item.InitNumber) {
      return;
    }
    this.Item.ActuallyNumber++;
  }
  updateItem(item) {
    if (this.Item.IsFull) {
      this.Item.ActuallyNumber = this.Item.InitNumber;
    }
  }
  Remove() {
    if (this.Item.ActuallyNumber <= 0) {
      return;
    }
    this.Item.ActuallyNumber--;
  }
  async Pic() {
    window.document.getElementById(`img_${this.Item.Id}`).click();
  }
  FileChange(input: any, filename: any) {
    this.Item.UploadFile = new FileContain(filename, input.target.files[0])
  }

}
