import { Component, ElementRef, Input, Output, EventEmitter, Renderer, HostBinding, SimpleChanges } from '@angular/core';
import { ContentPostModel } from '../../../models/contents/content-pass';
import { ContentProperty } from '../../../models/contents/content-property';
@Component({
  selector: 'sdhc-input-datetime',
  templateUrl: 'sdhc-input-datetime.html'
})

export class SDHCInputDateTimeCom {

  @Input() Property: ContentProperty = new ContentProperty();
  DatePicker: string;
  constructor() {
    this.DatePicker = (new Date()).toISOString();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.Property.Value = new Date(changes['Property']['currentValue']['Value']).toISOString();
    // this.Property.Value = new Date(this.Property.Value).toISOString();
  }
}
