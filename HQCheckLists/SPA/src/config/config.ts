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
  Image = 1,

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
  UserType = 305,

  ReservationCreate = 401,
  ReservationRead = 402,
  ReservationUpdate = 403,
  ReservationDelete = 404,
  ReservationReadByTimeLength = 405,

  CleaningCreate = 501,
  CleaningRead = 502,
  CleaningUpdate = 503,
  CleaningDelete = 504,
  CleaningReadByReservationId = 505,
  CleaningReadCleanerJob = 506,
  CleaningReadByCleaningId = 507,
  CleaningUpdateStartCleaning = 508,
  CleaningUpdateCompleteCleaning = 509,
  CleaningUpdateBedChecking = 510,

  CleaningItemCreate = 601,
  CleaningItemRead = 602,
  CleaningItemUpdate = 603,
  CleaningItemDelete = 604,
  CleaningItemReadPostModels = 605,
  CleaningItemUpdateItem = 606,

  UserReadAllCleaner = 701,
  UserReadUserById = 702,

  CleaningPictureCreate = 801,
  CleaningPictureReadByCleaningPicId = 802,
  CleaningPictureReadByCleaningId = 803,
  CleaningPictureUpdate = 804,
  CleaningPictureDelete = 805,



}
export class Config {
  static URLTyle = {
    UAT: '',
    PROD: '',
  }
  static DefaultApi = "";
  static BaseUrl: string = Config.URLTyle.PROD;
  static ApiUrl: { [key: number]: ApiProperty } = {
    [ApiCall.Image]: Config.setApi("", false, []),
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
    [ApiCall.UserType]: Config.setApi("/User/UserType", false, []),


    [ApiCall.ReservationCreate]: Config.setApi("/Api/Reservation/Create", false, []),
    [ApiCall.ReservationRead]: Config.setApi("/Api/Reservation/Read", false, []),
    [ApiCall.ReservationUpdate]: Config.setApi("/Api/Reservation/Update", false, []),
    // [ApiCall.ReservationDelete]: Config.setApi("/Api/Reservation", false, []),
    [ApiCall.ReservationReadByTimeLength]: Config.setApi("/Api/Reservation/ReadSummaryByDays", false, []),
    [ApiCall.CleaningCreate]: Config.setApi("/Api/Cleaning/Create", false, []),
    [ApiCall.CleaningRead]: Config.setApi("/Api/Cleaning/Read", false, []),
    [ApiCall.CleaningUpdate]: Config.setApi("/Api/Cleaning/Update", false, []),
    [ApiCall.CleaningDelete]: Config.setApi("/Api/Cleaning/Delete", false, []),
    [ApiCall.CleaningReadByReservationId]: Config.setApi("/Api/Cleaning/ReadByReservationId", false, []),
    [ApiCall.CleaningReadCleanerJob]: Config.setApi("/Api/Cleaning/ReadCleanerJon", false, []),
    [ApiCall.CleaningReadByCleaningId]: Config.setApi("/Api/Cleaning/ReadByCleaningId", false, []),
    [ApiCall.CleaningUpdateStartCleaning]: Config.setApi("/Api/Cleaning/UpdateStartCleaning", false, []),
    [ApiCall.CleaningUpdateCompleteCleaning]: Config.setApi("/Api/Cleaning/UpdateCompleteCleaning", false, []),
    [ApiCall.CleaningUpdateBedChecking]: Config.setApi("/Api/Cleaning/UpdateBedChecking", false, []),




    [ApiCall.CleaningItemReadPostModels]: Config.setApi("/Api/CleaningItem/ReadPostModels", false, []),
    [ApiCall.CleaningItemUpdate]: Config.setApi("/Api/CleaningItem/Update", false, []),
    [ApiCall.CleaningItemUpdateItem]: Config.setApi("/Api/CleaningItem/UpdateItem", false, []),


    [ApiCall.UserReadAllCleaner]: Config.setApi("/Api/User/ReadAllCleaner", false, []),
    [ApiCall.UserReadUserById]: Config.setApi("/Api/User/ReadUserById", false, []),


    [ApiCall.CleaningPictureCreate]: Config.setApi("/Api/CleaningPicture/Create", false, []),
    [ApiCall.CleaningPictureReadByCleaningPicId]: Config.setApi("/Api/CleaningPicture/ReadByCleaningPicId", false, []),
    [ApiCall.CleaningPictureReadByCleaningId]: Config.setApi("/Api/CleaningPicture/ReadByCleaningId", false, []),
    [ApiCall.CleaningPictureUpdate]: Config.setApi("/Api/CleaningPicture/Update", false, []),
    [ApiCall.CleaningPictureDelete]: Config.setApi("/Api/CleaningPicture/Delete", false, []),
  }
  private static setApi(url: string, useMock: boolean, m: any) {
    return new ApiProperty(url, useMock, m);
  }
  public static TransactionOutTime: number = 60 * 2;
}
