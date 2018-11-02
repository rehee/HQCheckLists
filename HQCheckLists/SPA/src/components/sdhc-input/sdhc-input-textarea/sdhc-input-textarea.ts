import { Component, ElementRef, Input, Output, EventEmitter, Renderer, HostBinding } from '@angular/core';
import { ContentPostModel } from '../../../models/contents/content-pass';
import { ContentProperty } from '../../../models/contents/content-property';
@Component({
  selector: 'sdhc-input-textarea',
  templateUrl: 'sdhc-input-textarea.html'
})
export class SDHCInputTextAreaCom {
  @Input() Property: ContentProperty = new ContentProperty();
}
