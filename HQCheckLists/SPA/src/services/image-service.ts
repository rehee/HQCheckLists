import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CoreFunction, FileContain } from "../core/core-function";
import { HttpType, ApiCall, Config } from '../config/config';
import { Property, Inventory } from '../models';
import { ApiResponse } from '../models/ApiResponse';
import { ContentPostModel } from '../models/contents/content-pass';
import { Reservation } from '../models/reservation';
import { Cleaning, CleanerJob, CleaningView, CleaningItem, CleaningPicture } from '../models/cleaning';
import { HQUser } from '../models/users/hq-user';
@Injectable()
export class ImageService {
  constructor(private http: Http) { }
  private async httpRequest() {
    return await CoreFunction.GetHttpResponseAsync(this.http);
  }
  public async GetImage(): Promise<any> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.Image), null, "/build/CleaningPic/d5a312bb-5881-41aa-a2e2-92fc86fd9754/350");
  }
}
