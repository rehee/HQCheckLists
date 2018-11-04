import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CoreFunction, FileContain } from "../core/core-function";
import { HttpType, ApiCall } from '../config/config';
import { Property, Inventory } from '../models';
import { ApiResponse } from '../models/ApiResponse';
import { ContentPostModel } from '../models/contents/content-pass';
import { Reservation } from '../models/reservation';
import { Cleaning } from '../models/cleaning';
import { HQUser } from '../models/users/hq-user';
@Injectable()
export class DataService {
  constructor(private http: Http) { }
  private async httpRequest() {
    return await CoreFunction.GetHttpResponseAsync(this.http);
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

  public async CleaningItemReadPostModel(cleaningId: string): Promise<ApiResponse<ContentPostModel[]>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.CleaningItemReadPostModels), null, `/?cleaningId=${cleaningId}`);
  }
  public async CleaningItemUpdate(model: ContentPostModel): Promise<ApiResponse<ContentPostModel[]>> {
    return await (await this.httpRequest())(HttpType.Mix, Number(ApiCall.CleaningItemUpdate), model);
  }

  public async UserReadAllCleaner(activeUser: boolean): Promise<ApiResponse<HQUser[]>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.UserReadAllCleaner), null, `/?activeUser=${String(activeUser)}`);
  }

}
