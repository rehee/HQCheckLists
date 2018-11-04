import { Component, ElementRef, Input, Output, EventEmitter, Renderer, HostBinding, SimpleChanges } from '@angular/core';
import { ContentPostModel } from '../../../models/contents/content-pass';
import { ContentProperty } from '../../../models/contents/content-property';
@Component({
  selector: 'sdhc-input-dropdown',
  templateUrl: 'sdhc-input-dropdown.html'
})
export class SDHCInputDropDownCom {
  @Input() Property: ContentProperty = new ContentProperty();

  ngOnChanges(changes: SimpleChanges) {
  }
}
