import { Component, Input } from '@angular/core';
import { Cleaning } from '../../../models/cleaning';

@Component({
  selector: 'hq-cleaner-check',
  templateUrl: 'hq-cleaner-check.html'
})
export class HQCleanerCheck {
  @Input() CleaningRecord: Cleaning = new Cleaning();
  @Input() Property: string = "";
  @Input() Max: number = 0;
  @Input() Title: string = "";
  IsFull: boolean = false;
  Value() {
    return this.CleaningRecord[this.Property];
  }
  GetIsFull() {
    return `${this.Property}IsFull`;
  }
  Add() {
    let current = <number>this.Value();
    if (current >= this.Max) {
      return;
    }
    this.CleaningRecord[this.Property] = current + 1;
  }
  updateItem(item) {
    if (this.CleaningRecord[this.Property + 'IsFull']) {
      this.CleaningRecord[this.Property] = this.Max;
    }
  }
  Remove() {
    let current = <number>this.Value();
    if (current <= 0) {
      return;
    }
    this.CleaningRecord[this.Property] = current - 1;
  }
}
