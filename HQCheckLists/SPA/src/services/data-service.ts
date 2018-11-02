import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CoreFunction, FileContain } from "../core/core-function";
import { HttpType, ApiCall } from '../config/config';
import { Property, Inventory } from '../models';
import { ApiResponse } from '../models/ApiResponse';
import { ContentPostModel } from '../models/contents/content-pass';
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


}
