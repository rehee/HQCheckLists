import { Component, ElementRef, Input, Output, EventEmitter, Renderer, HostBinding } from '@angular/core';
import { ContentPostModel } from '../../../models/contents/content-pass';
import { ContentProperty } from '../../../models/contents/content-property';
@Component({
  selector: 'sdhc-input-file',
  templateUrl: 'sdhc-input-file.html'
})
export class SDHCInputFileCom {
  @Input() Property: ContentProperty = new ContentProperty();

  FileChange(input: any, property: ContentProperty) {
    console.log(input);
    property.File = input.target.files[0];
  }
}
