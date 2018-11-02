import { Component, ElementRef, Input, Output, EventEmitter, Renderer, HostBinding } from '@angular/core';
import { ContentPostModel } from '../../models/contents/content-pass';
import { ContentProperty } from '../../models/contents/content-property';
@Component({
  selector: 'sdhc-item',
  templateUrl: 'sdhc-item.html'
})
export class SDHCItemCom {
  @Input() Property: ContentProperty = new ContentProperty();
}
