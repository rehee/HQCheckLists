import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../services';
import { stringify } from '@angular/core/src/render3/util';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
export enum ImageType {
  Property,
  PropertyItem,
  CleanPicture,
  CleanItem,
}

@Pipe({ name: 'hqimage' })
export class HQImagePipe implements PipeTransform {
  constructor(public ds: DataService) {

  }
  transform(id: string, args: number[]): string {
    let url: string;
    switch (args[0]) {
      case ImageType.Property:
        url = `/build/Property/${id}/${args[1]}`;
        break;
      case ImageType.PropertyItem:
        url = `/build/Inventory/${id}/${args[1]}`;
        break;
      case ImageType.CleanPicture:
        url = `/build/CleaningPic/${id}/${args[1]}`;
        break;
      case ImageType.CleanItem:
        url = `/build/CleanItem/${id}/${args[1]}`;
        break;
      default:
        break;
    }
    this.ds.RefreshImage(url).then(b => {
    });
    return url;
  }
}
