import { Component, ElementRef, Input, Output, EventEmitter, Renderer, HostBinding } from '@angular/core';
import { ContentPostModel } from '../../../models/contents/content-pass';
import { ContentProperty } from '../../../models/contents/content-property';
@Component({
  selector: 'sdhc-input-number',
  templateUrl: 'sdhc-input-number.html'
})
export class SDHCInputNumberCom {
  @Input() Property: ContentProperty = new ContentProperty();
}
