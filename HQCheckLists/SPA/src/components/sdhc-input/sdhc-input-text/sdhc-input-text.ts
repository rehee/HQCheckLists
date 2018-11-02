import { Component, ElementRef, Input, Output, EventEmitter, Renderer, HostBinding } from '@angular/core';
import { ContentPostModel } from '../../../models/contents/content-pass';
import { ContentProperty } from '../../../models/contents/content-property';
@Component({
  selector: 'sdhc-input-text',
  templateUrl: 'sdhc-input-text.html'
})
export class SDHCInputTextCom {
  @Input() Property: ContentProperty = new ContentProperty();
}
