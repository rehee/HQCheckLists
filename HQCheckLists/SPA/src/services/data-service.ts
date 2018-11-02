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


  public async GetInventoryByProperty(propertyId: string): Promise<Inventory[]> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.GetInventoryByProperty), null, propertyId);
  }
  public async GetPropertyInventory(inventoryId: string): Promise<Inventory[]> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.GetPropertyInventory), null, `/${inventoryId}`);
  }
  public async CreatePropertyInventory(model: Inventory, files: FileContain[]): Promise<Inventory> {
    return await (await this.httpRequest())(HttpType.File, Number(ApiCall.CreatePropertyInventory), model, null, files);
  }
  public async UpdatePropertyInventory(model: Inventory, files: FileContain[]): Promise<Inventory> {
    return await (await this.httpRequest())(HttpType.File, Number(ApiCall.UpdatePropertyInventory), model, null, files);
  }


}
