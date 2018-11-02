import { Component, ElementRef, Input, Output, EventEmitter, Renderer, HostBinding } from '@angular/core';
import { ContentPostModel } from '../../../models/contents/content-pass';
import { ContentProperty } from '../../../models/contents/content-property';
@Component({
  selector: 'sdhc-input-datetime',
  templateUrl: 'sdhc-input-datetime.html'
})
export class SDHCInputDateTimeCom {
  @Input() Property: ContentProperty = new ContentProperty();
}
