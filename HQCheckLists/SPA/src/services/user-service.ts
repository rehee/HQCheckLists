import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CoreFunction, FileContain } from "../core/core-function";
import { HttpType, ApiCall } from '../config/config';
import { Property, Inventory } from '../models';
import { ApiResponse } from '../models/ApiResponse';
import { CurrentUser } from '../models/users/current-user';
import { LoginViewModel } from '../models/users/login-model';
import { SiteInfo, SiteKey } from '../config/site-info';
import { EnumPages } from '../models/access/enum-pages';
@Injectable()
export class UserService {
  constructor(private http: Http) { }
  private async httpRequest() {
    return await CoreFunction.GetHttpResponseAsync(this.http);
  }

  public async GetCurrentUser(): Promise<ApiResponse<CurrentUser>> {
    return await (await this.httpRequest())(HttpType.Get, Number(ApiCall.GetCurrentUser));
  }
  public async Login(model: LoginViewModel): Promise<ApiResponse<CurrentUser>> {
    return await (await this.httpRequest())(HttpType.Post, Number(ApiCall.Login), model);
  }
  public async LoginAndCheck(model: LoginViewModel): Promise<ApiResponse<CurrentUser>> {
    let loginResult = await this.Login(model);
    if (loginResult != null && loginResult.Success) {
      SiteInfo.SetSiteValue(SiteKey.UserName, loginResult.Data.Name);
    }
    return loginResult;
  }
  public async LogOff(): Promise<ApiResponse<CurrentUser>> {
    return await (await this.httpRequest())(HttpType.Post, Number(ApiCall.LogOff));
  }
  public async LogOffAndCheck(): Promise<ApiResponse<CurrentUser>> {
    let loginResult = await this.LogOff();
    if (loginResult != null && loginResult.Success) {
      SiteInfo.SetSiteValue(SiteKey.UserName, loginResult.Data.Name);
    }
    return loginResult;
  }

  public async CanAccess(page: EnumPages): Promise<ApiResponse<any>> {
    return await (await this.httpRequest())(HttpType.Post, Number(ApiCall.CanAccess), page);
  }

  public async CanAccessCheck(page: EnumPages): Promise<boolean> {
    let userName = await SiteInfo.GetSiteKey(SiteKey.UserName);
    let key = "";
    if (userName != null || userName != "") {
      key = `${userName}_PageAccess_${page}`;
    }
    if (SiteInfo.OnConnect) {
      let access = await this.CanAccess(page);
      if (key != null) {
        SiteInfo.storage.set(key, access.Success);
      }
      return access.Success;
    } else {
      if (key == "") {
        return false;
      }
      return await SiteInfo.storage.get(key);
    }
  }

}
