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
@Pipe({ name: 'hqtimespend' })
export class HQTimeSpendPipe implements PipeTransform {
  constructor(public ds: DataService) {

  }
  transform(input: Date): number {
    let inputDate = new Date(input);
    if (!inputDate) {
      return -1;
    }
    let today = new Date();
    let date = new Date(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`)
    // let tomorrow = new Date(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 1}`)
    var day = 1000 * 60 * 60 * 24;

    if (date >= input) {
      return -1;
    }
    if (date >= input != true) {
      let inputNumber = inputDate.getTime();
      let newNumber = date.getTime();
      return Math.ceil((inputNumber - newNumber) / day);
    }
  }
}
