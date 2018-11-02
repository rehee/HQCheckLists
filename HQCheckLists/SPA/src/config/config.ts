import { ResponseMockSet } from "./config-mock";



export enum HttpType {
  Get = 1,
  Post = 2,
  Put = 3,
  Delete = 4,
  File = 5,
  Mix = 6,
}

export class ApiProperty {
  public Url: string = "";
  public UseMock: boolean = true;
  public ResponseMockModule: any = null;
  constructor(url: string, useMock: boolean, m: any) {
    this.Url = url;
    this.UseMock = useMock;
    this.ResponseMockModule = m;
  }
}
export enum ApiCall {
  PropertyCreate = 101,
  PropertyRead = 102,
  PropertyUpdate = 103,
  

  GetInventoryByProperty = 201,
  GetPropertyInventory = 210,
  CreatePropertyInventory = 211,
  UpdatePropertyInventory = 212,

  GetCurrentUser = 301,
  Login = 302,
  LogOff = 303,
  CanAccess = 304,

}
export class Config {
  static URLTyle = {
    UAT: '',
    PROD: '',
  }
  static DefaultApi = "";
  static BaseUrl: string = Config.URLTyle.PROD;
  static ApiUrl: { [key: number]: ApiProperty } = {

    [ApiCall.PropertyCreate]: Config.setApi("/Api/Property/Create", false, []),
    [ApiCall.PropertyRead]: Config.setApi("/Api/Property/Read", false, []),
    [ApiCall.PropertyUpdate]: Config.setApi("/Api/Property/Update", false, []),
    
    [ApiCall.GetInventoryByProperty]: Config.setApi("/Api/PropertyInventory/Read", false, []),
    [ApiCall.CreatePropertyInventory]: Config.setApi("/Api/PropertyInventory/Create", false, []),
    [ApiCall.UpdatePropertyInventory]: Config.setApi("/Api/Update", false, []),

    [ApiCall.GetPropertyInventory]: Config.setApi("/Property/GetPropertyInventory", false, []),

    [ApiCall.GetCurrentUser]: Config.setApi("/User/CurrentUser", false, []),
    [ApiCall.Login]: Config.setApi("/User/Login", false, []),
    [ApiCall.LogOff]: Config.setApi("/User/Logoff", false, []),
    [ApiCall.CanAccess]: Config.setApi("/User/CanAccess", false, []),


  }
  private static setApi(url: string, useMock: boolean, m: any) {
    return new ApiProperty(url, useMock, m);
  }
  public static TransactionOutTime: number = 60 * 2;
}
