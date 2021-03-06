import { Component, ElementRef, Input, Output, EventEmitter, Renderer, HostBinding } from '@angular/core';
import { ContentPostModel } from '../../models/contents/content-pass';
import { ContentProperty } from '../../models/contents/content-property';
@Component({
  selector: 'sdhc-post',
  templateUrl: 'sdhc-post.html'
})
export class SDHCPostCom {
  @Input() PostModel: ContentPostModel = new ContentPostModel();
  @Input() Name: string = "";
}
