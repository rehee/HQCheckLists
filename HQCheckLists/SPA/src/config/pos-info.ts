import { Storage } from '@ionic/storage';
export enum PosKey {
  PosId = 1,
  PosToken = 2,
  ApiUrl = 3,
  Password = 4,
  RefundPassword = 100,
  QRCode = 5,
}

export class PosInfo {
  public static storage: Storage = null;
  public static SetStorage(storage: Storage) {
    PosInfo.storage = storage;
  }
  public static async GetPosKey(key: PosKey): Promise<string> {
    let keyNumber = Number(key);
    return String(keyNumber);
  }
  public static async DisplayQRCode(): Promise<boolean> {
    let result = await PosInfo.GetPosValue(PosKey.QRCode);
    if (result == null || result == "") {
      return true;
    }
    if (result == "true") {
      return true;
    }
    return false;
  }
  public static async SetPosValue(key: PosKey, value: string) {
    let keyString = await PosInfo.GetPosKey(key);
    PosInfo.storage.set(keyString, value);
  }

  public static async GetPosValue(key: PosKey): Promise<string> {
    let keyString = await PosInfo.GetPosKey(key);
    return await PosInfo.storage.get(keyString);
  }



  public static PosKeyMap: { [key: number]: string } = {
    [PosKey.PosToken]: 'PosToken',
  }

}
