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


  InventoryCreate = 201,
  InventoryRead = 202,
  InventoryUpdate = 203,
  InventoryUpdateQty = 204,

  GetCurrentUser = 301,
  Login = 302,
  LogOff = 303,
  CanAccess = 304,

  ReservationCreate = 401,
  ReservationRead = 402,
  ReservationUpdate = 403,
  ReservationDelete = 404,

  CleaningCreate = 501,
  CleaningRead = 502,
  CleaningUpdate = 503,
  CleaningDelete = 504,
  CleaningReadByReservationId = 505,

  CleaningItemCreate = 601,
  CleaningItemRead = 602,
  CleaningItemUpdate = 603,
  CleaningItemDelete = 604,
  CleaningItemReadPostModels = 605,

  UserReadAllCleaner = 711,
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

    [ApiCall.InventoryCreate]: Config.setApi("/Api/PropertyInventory/Create", false, []),
    [ApiCall.InventoryRead]: Config.setApi("/Api/PropertyInventory/Read", false, []),
    [ApiCall.InventoryUpdate]: Config.setApi("/Api/PropertyInventory/Update", false, []),
    [ApiCall.InventoryUpdateQty]: Config.setApi("/Api/PropertyInventory/UpdateQty", false, []),

    [ApiCall.GetCurrentUser]: Config.setApi("/User/CurrentUser", false, []),
    [ApiCall.Login]: Config.setApi("/User/Login", false, []),
    [ApiCall.LogOff]: Config.setApi("/User/Logoff", false, []),
    [ApiCall.CanAccess]: Config.setApi("/User/CanAccess", false, []),

    [ApiCall.ReservationCreate]: Config.setApi("/Api/Reservation/Create", false, []),
    [ApiCall.ReservationRead]: Config.setApi("/Api/Reservation/Read", false, []),
    [ApiCall.ReservationUpdate]: Config.setApi("/Api/Reservation/Update", false, []),
    // [ApiCall.ReservationDelete]: Config.setApi("/Api/Reservation", false, []),

    [ApiCall.CleaningCreate]: Config.setApi("/Api/Cleaning/Create", false, []),
    [ApiCall.CleaningRead]: Config.setApi("/Api/Cleaning/Read", false, []),
    [ApiCall.CleaningUpdate]: Config.setApi("/Api/Cleaning/Update", false, []),
    [ApiCall.CleaningDelete]: Config.setApi("/Api/Cleaning/Delete", false, []),
    [ApiCall.CleaningReadByReservationId]: Config.setApi("/Api/Cleaning/ReadByReservationId", false, []),


    [ApiCall.CleaningItemReadPostModels]: Config.setApi("/Api/CleaningItem/ReadPostModels", false, []),
    [ApiCall.CleaningItemUpdate]: Config.setApi("/Api/CleaningItem/Update", false, []),

    [ApiCall.UserReadAllCleaner]: Config.setApi("/Api/User/ReadAllCleaner", false, []),


  }
  private static setApi(url: string, useMock: boolean, m: any) {
    return new ApiProperty(url, useMock, m);
  }
  public static TransactionOutTime: number = 60 * 2;
}
