import { Component, ElementRef, Input, Output, EventEmitter, Renderer, HostBinding } from '@angular/core';
import { ContentPostModel } from '../../../models/contents/content-pass';
import { ContentProperty } from '../../../models/contents/content-property';
@Component({
  selector: 'sdhc-input-bool',
  templateUrl: 'sdhc-input-bool.html'
})
export class SDHCInputBoolCom {
  @Input() Property: ContentProperty = new ContentProperty();
}
