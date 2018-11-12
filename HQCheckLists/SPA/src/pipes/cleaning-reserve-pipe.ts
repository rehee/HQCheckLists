import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../services';
import { stringify } from '@angular/core/src/render3/util';
import { EnumStatus } from '../models/enums/enum-status';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/

@Pipe({ name: 'cleaningreserve' })
export class CleaningReservePipe implements PipeTransform {
  constructor(public ds: DataService) {

  }
  async transform(id: string, args: string[]): Promise<any> {
    let cleaning = await this.ds.CleaningReadByReservationId(id);
    if (!cleaning || !cleaning.Success) {
      return { name: '无打扫' };
    }
    let result = "";
    switch (cleaning.Data.Status) {
      case EnumStatus.Draft:
        result = '草稿';
        break;
      case EnumStatus.Pending:
        result = '未打扫';
        break;
      case EnumStatus.Processing:
        result = '打扫中';
        break;
      case EnumStatus.Complete:
        result = '完成打扫';
        break;
      case EnumStatus.Approving:
        result = '验收';
        break;
    }
    return { name: result };
  }
}
