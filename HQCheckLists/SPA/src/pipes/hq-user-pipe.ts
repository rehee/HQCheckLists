import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../services';
import { stringify } from '@angular/core/src/render3/util';
import { EnumStatus } from '../models/enums/enum-status';
import { HQUser } from '../models/users/hq-user';
import { removeSummaryDuplicates } from '@angular/compiler';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/

@Pipe({ name: 'hquser' })
export class HQUserePipe implements PipeTransform {
  constructor(public ds: DataService) {

  }
  async transform(id: string, args: string[]): Promise<HQUser> {
    let results = await this.ds.UserReadById(id);
    if (!results || !results.Success) {
      return new HQUser();
    }
    return results.Data;
  }
}
