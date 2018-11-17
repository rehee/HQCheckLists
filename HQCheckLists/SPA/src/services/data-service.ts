import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CoreFunction, FileContain } from "../core/core-function";
import { HttpType, ApiCall } from '../config/config';
import { Property, Inventory } from '../models';
import { ApiResponse } from '../models/ApiResponse';
import { ContentPostModel } from '../models/contents/content-pass';
import { Reservation, ReservationSummaryDate } from '../models/reservation';
import { Cleaning, CleanerJob, CleaningView, CleaningItem, CleaningPicture } from '../models/cleaning';
import { HQUser } from '../models/users/hq-user';
@Injectable()
export class DataService {
  constructor(private http: Http) { }
  private async httpRequest() {
    return await CoreFunction.GetHttpResponseAsync(this.http);
  }
  public async RefreshImage(url:string): Promise<any> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.Image), null, url);
  }
  public async PropertyGetAll(): Promise<ApiResponse<Property[]>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.PropertyRead));
  }
  public async PropertyPreCreate(): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.PropertyCreate));
  }
  public async PropertCreate(model: ContentPostModel): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Mix, Number(ApiCall.PropertyCreate), model);
  }
  public async PropertyPreUpdate(propertyId: string): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.PropertyUpdate), null, `/?propertyId=${propertyId}`);
  }
  public async PropertyUpdate(model: ContentPostModel): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Mix, Number(ApiCall.PropertyUpdate), model);
  }
  public async PropertyReadById(propertyId: string): Promise<ApiResponse<Property>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.PropertyRead), null, `/?propertyId=${propertyId}`);
  }


  public async InventoryRead(propertyId: string): Promise<ApiResponse<Inventory[]>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.InventoryRead), null, `/?propertyId=${propertyId}`);
  }

  public async InventoryPreCreate(propertyId: string): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.InventoryCreate), null, `/?propertyId=${propertyId}`);
  }
  public async InventoryCreate(model: ContentPostModel): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Mix, Number(ApiCall.InventoryCreate), model);
  }
  public async InventoryPreUpdate(inventoryId: string): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.InventoryUpdate), null, `/?inventoryId=${inventoryId}`);
  }

  public async InventoryUpdate(model: ContentPostModel): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Mix, Number(ApiCall.InventoryUpdate), model);
  }
  public async InventoryUpdateQty(inventoryId: string, number: string): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Post, Number(ApiCall.InventoryUpdateQty), { inventoryId: inventoryId, number: number });
  }

  public async ReservationPreCreate(propertyId: string): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.ReservationCreate), null, `/?propertyId=${propertyId}`);
  }
  public async ReservationCreate(model: ContentPostModel): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Mix, Number(ApiCall.ReservationCreate), model);
  }
  public async ReservationRead(propertyId: string): Promise<ApiResponse<Reservation[]>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.ReservationRead), null, `/?propertyId=${propertyId}`);
  }
  public async ReservationPreUpdate(reservationId: string): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.ReservationUpdate), null, `/?reservationId=${reservationId}`);
  }
  public async ReservationUpdate(model: ContentPostModel): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Mix, Number(ApiCall.ReservationUpdate), model);
  }

  public async ReservationReadByTimeLength(days:string): Promise<ApiResponse<ReservationSummaryDate[]>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.ReservationReadByTimeLength), null,`/${days}`);
  }

  public async CleaningReadByPropertyId(propertyId: string): Promise<ApiResponse<Cleaning[]>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.CleaningRead), null, `/?propertyId=${propertyId}`);
  }
  public async CleaningPreCreate(propertyId: string, reservationId: string): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.CleaningCreate), null, `/?propertyId=${propertyId}&reservationId=${reservationId}`);
  }
  public async CleaningCreate(model: ContentPostModel): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Mix, Number(ApiCall.CleaningCreate), model);
  }
  public async CleaningPreUpdate(cleaningId: string): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.CleaningUpdate), null, `/?cleaningId=${cleaningId}`);
  }
  public async CleaningUpdate(model: ContentPostModel): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Mix, Number(ApiCall.CleaningUpdate), model);
  }

  public async CleaningReadByReservationId(reservationId: string): Promise<ApiResponse<Cleaning>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.CleaningReadByReservationId), null, `/?reservationId=${reservationId}`);
  }
  public async CleaningReadCleanerJob(): Promise<ApiResponse<CleanerJob[]>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.CleaningReadCleanerJob));
  }
  public async CleaningReadByCleaningId(cleaningId: string): Promise<ApiResponse<CleaningView>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.CleaningReadByCleaningId), null, `/?cleaningId=${cleaningId}`);
  }
  public async CleaningUpdateStartCleaning(cleaningId: string): Promise<ApiResponse<any>> {
    let m = { cleaningId: cleaningId };
    return await (await this.httpRequest())(HttpType.Post, Number(ApiCall.CleaningUpdateStartCleaning), m);
  }
  public async CleaningUpdateCompleteCleaning(cleaningId: string): Promise<ApiResponse<any>> {
    return await (await this.httpRequest())(HttpType.Post, Number(ApiCall.CleaningUpdateCompleteCleaning), { cleaningId: cleaningId });
  }
  public async CleaningUpdateBedChecking(model: Cleaning): Promise<ApiResponse<any>> {
    return await (await this.httpRequest())(HttpType.Post, Number(ApiCall.CleaningUpdateBedChecking), model);
  }


  public async CleaningItemReadPostModel(cleaningId: string): Promise<ApiResponse<ContentPostModel[]>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.CleaningItemReadPostModels), null, `/?cleaningId=${cleaningId}`);
  }
  public async CleaningItemUpdate(model: ContentPostModel): Promise<ApiResponse<ContentPostModel[]>> {
    return await (await this.httpRequest())(HttpType.Mix, Number(ApiCall.CleaningItemUpdate), model);
  }
  public async CleaningItemUpdateItem(item: CleaningItem): Promise<ApiResponse<ContentPostModel[]>> {
    let file = item.UploadFile;
    let files = []
    if (!file != true) {
      files.push(file);
    }
    item.UploadFile = null;
    return await (await this.httpRequest())(HttpType.File, Number(ApiCall.CleaningItemUpdateItem), item, null, files);
  }



  public async UserReadAllCleaner(activeUser: boolean): Promise<ApiResponse<HQUser[]>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.UserReadAllCleaner), null, `/?activeUser=${String(activeUser)}`);
  }
  public async UserReadById(userId:string): Promise<ApiResponse<HQUser>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.UserReadUserById), null, `/${String(userId)}`);
  }

  public async CleaningPicturePreCreate(cleaningId: string): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.CleaningPictureCreate), null, `/?cleaningId=${cleaningId}`);
  }
  public async CleaningPictureCreate(model: ContentPostModel): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Mix, Number(ApiCall.CleaningPictureCreate), model);
  }
  public async CleaningPictureReadByCleaningPicId(cleaningPicId: string): Promise<ApiResponse<CleaningPicture>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.CleaningPictureReadByCleaningPicId), null, `/?cleaningPicId=${cleaningPicId}`);
  }
  public async CleaningPictureReadByCleaningId(cleaningId: string): Promise<ApiResponse<CleaningPicture[]>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.CleaningPictureReadByCleaningId), null, `/?cleaningId=${cleaningId}`);
  }
  public async CleaningPicturePreUpdate(cleaningPicId: string): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.CleaningPictureUpdate), null, `/?cleaningPicId=${cleaningPicId}`);
  }
  public async CleaningPictureUpdate(model: ContentPostModel): Promise<ApiResponse<ContentPostModel>> {
    return await (await this.httpRequest())(HttpType.Mix, Number(ApiCall.CleaningPictureUpdate), model);
  }
  public async CleaningPictureDelete(model: CleaningPicture): Promise<ApiResponse<any>> {
    return await (await this.httpRequest())(HttpType.Post, Number(ApiCall.CleaningPictureDelete), model);
  }


}
