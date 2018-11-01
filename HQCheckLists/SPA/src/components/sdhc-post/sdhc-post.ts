import { Component, ElementRef, Input, Output, EventEmitter, Renderer, HostBinding } from '@angular/core';
import { ContentPostModel } from '../../models/contents/content-pass';
import { ContentProperty } from '../../models/contents/content-property';
@Component({
  selector: 'sdhc-post',
  templateUrl: 'sdhc-post.html'
})
export class SDHCPostCom {
  @Input() PostModel: ContentPostModel;

  FileChange(input: any, property: ContentProperty) {
    console.log(input.target.files[0]);
    property.File = input.target.files[0];
    console.log(this.PostModel);
  }
}