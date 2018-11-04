import { Component, ElementRef, Input, Output, EventEmitter, Renderer, HostBinding, SimpleChanges } from '@angular/core';
import { SelectItem } from '../../../models/contents/select-item';
import { ContentProperty } from '../../../models/contents/content-property';

@Component({
  selector: 'hq-select',
  templateUrl: 'hq-select.html'
})
export class HqSelectCom {
  @Input() Value: ContentProperty = new ContentProperty();
  @Input() Title: string = "";
  @Input() Select: SelectItem[] = [];

  ngOnChanges(changes: SimpleChanges) {
  }
}
