import { Pipe, PipeTransform } from '@angular/core';
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
  PropertyItem
}

@Pipe({ name: 'hqimage' })
export class HQImagePipe implements PipeTransform {
  transform(id: string, args: number[]): string {
    switch (args[0]) {
      case ImageType.Property:
        return `/build/Property/${id}/${args[1]}`;
      case ImageType.PropertyItem:
        return `/build/Inventory/${id}/${args[1]}`;
    }
  }
}
