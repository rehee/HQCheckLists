import { ResponseMockSet } from "./config-mock";



export enum HttpType {
  Get = 1,
  Post = 2,
  Put = 3,
  Delete = 4,
  File = 5
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
  GetAllProperties = 101,
  GetInventoryByProperty = 201,
  CreatePropertyInventory = 211,
}
export class Config {
  static URLTyle = {
    UAT: 'https://localhost:44304',
    PROD: 'https://localhost:44304',
  }
  static DefaultApi = "https://localhost:44304";
  static BaseUrl: string = Config.URLTyle.PROD;
  static ApiUrl: { [key: number]: ApiProperty } = {
    [ApiCall.GetAllProperties]: Config.setApi("/Property/GetAllProperties", false, []),
    [ApiCall.GetInventoryByProperty]: Config.setApi("/Property/GetInventoryByProperty?propertyId=", false, []),
    [ApiCall.CreatePropertyInventory]: Config.setApi("/Property/CreatePropertyInventory", false, []),
  }
  private static setApi(url: string, useMock: boolean, m: any) {
    return new ApiProperty(url, useMock, m);
  }
  public static TransactionOutTime: number = 60 * 2;
}
