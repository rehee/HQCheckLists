import { Storage } from '@ionic/storage';
import { UserService } from '../services/user-service';
import { Network } from '@ionic-native/network';
export enum SiteKey {
  UserName = 0,
  Lalala = 1,
}

export class SiteInfo {
  public static storage: Storage = null;
  public static userService: UserService = null;
  public static OnConnect: boolean = true;
  public static SetStorage(storage: Storage, userService: UserService) {
    SiteInfo.storage = storage;
    SiteInfo.userService = userService;
  }
  public static count = 0;
  public static async SetUserName(): Promise<string> {
    let userName: string = "";
    if (SiteInfo.OnConnect) {
      let currentUser = await SiteInfo.userService.GetCurrentUser();
      if (!currentUser || !currentUser.Success) {
        await SiteInfo.storage.set("0", null);
        return null;
      }
      userName = currentUser.Data.Name;
      let currentUserName = await SiteInfo.storage.get("0");
      if (!!currentUserName && currentUserName != userName) {
        this.userService.LogOff();
        await SiteInfo.storage.set("0", null);
        return null;
      } else {
        await SiteInfo.storage.set("0", userName);
      }
    } else {
      userName = await SiteInfo.storage.get("0");
    }
    return userName;
  }
  public static async GetSiteKey(key: SiteKey): Promise<string> {
    let userName = await SiteInfo.SetUserName();
    let keyNumber = Number(key);
    if (key == SiteKey.UserName) {
      return String(keyNumber);
    }

    if (userName == null || userName == "") {
      return null;
    }
    return `${userName}_${String(keyNumber)}`
  }

  public static async SetSiteValue(key: SiteKey, value: string) {
    let keyString = await SiteInfo.GetSiteKey(key);
    if (keyString == null || keyString == "") {
      return;
    }
    SiteInfo.storage.set(keyString, value);
  }

  public static async GetSiteValue(key: SiteKey): Promise<string> {
    if (SiteInfo.storage == null) {
      return null;
    }
    let keyString = await SiteInfo.GetSiteKey(key);
    if (keyString == null || keyString == "") {
      return null;
    }
    return await SiteInfo.storage.get(keyString);
  }
  public static PosKeyMap: { [key: number]: string } = {
  }
}
