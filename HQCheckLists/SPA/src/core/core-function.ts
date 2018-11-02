import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { HttpType, Config, ApiProperty, ApiCall } from '../config/config';
import { ContentPostModel } from '../models/contents/content-pass';

export class CoreFunction {

  static Delay(ms: number) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    )
  }
  static GetDateString(date: Date = null): string {
    if (date == null) {
      date = new Date();
    }
    return `${date.getUTCFullYear()}${date.getUTCMonth() + 1 >= 10 ? `${date.getUTCMonth() + 1}` : `0${date.getUTCMonth() + 1}`}${date.getUTCDate() >= 10 ? date.getUTCDate() : '0' + date.getUTCDate()}${date.getUTCHours() >= 10 ? date.getUTCHours() : '0' + date.getUTCHours()}${date.getUTCMinutes() >= 10 ? date.getUTCMinutes() : '0' + date.getUTCMinutes()}${date.getUTCSeconds() >= 10 ? date.getUTCSeconds() : '0' + date.getUTCSeconds()}`;
  }
  static CreateApiCall(http: Http) {
    let httpRequestFunction = async () => {
      return await CoreFunction.GetHttpResponseAsync(http);
    }
    let apiCall = async <T>(httpType: HttpType, url: number, data: any = null, aditionalUrl: string = null, files: FileContain[] = []): Promise<T> => {
      return await (await httpRequestFunction())<T>(httpType, url, data, aditionalUrl, files);
    }
    return apiCall;
  }

  static GenerateUrl(apicall: ApiCall): string {
    let apiProperty: ApiProperty = Config.ApiUrl[Number(apicall)];
    return Config.BaseUrl + apiProperty.Url;
  }

  static GetHttpResponseAsync(http: Http, getOption: any = CoreFunction.GetHttpOption, getObserver: any = CoreFunction.GetHttpObserveAsync, getPromise: any = CoreFunction.GetHttpPromise, generalUrl: any = CoreFunction.generalUrl(Config.BaseUrl)) {
    let observer = getObserver(http, getOption());
    return <T>(httpType: HttpType, url: number, data: any = null, additionalUrl = "", files: FileContain[] = []) => {
      let apiProperty: ApiProperty = Config.ApiUrl[url]
      if (typeof (apiProperty) == 'undefined' || apiProperty == null) {
        return new Promise<T>((resolve, reject) => {
          resolve(null);
        });
      }
      if (apiProperty.UseMock) {
        return new Promise<T>((resolve, reject) => {
          resolve(apiProperty.ResponseMockModule);
        });
      }
      return getPromise(observer(httpType, generalUrl(apiProperty.Url, additionalUrl), data, files));
    };
  }
  static GetHttpPromise<T>(observe: Observable<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      observe.subscribe(
        response => {
          resolve(response)
        },
        error => resolve(null)
      )
    });
  }

  static GetHttpObserveAsync(http: Http, option: any, error: any = CoreFunction.error) {
    return <T>(httpType: HttpType, url: string = "", data: any, files: FileContain[] = []) => {
      let observable: Observable<Response>;
      switch (httpType) {
        case HttpType.Get:
          observable = http.get(
            url, option
          )
          break;
        case HttpType.Post:
          observable = http.post(
            url, JSON.stringify(data), option
          )
          break;
        case HttpType.Put:
          observable = http.put(
            url, JSON.stringify(data), option
          )
          break;
        case HttpType.Delete:
          observable = http.delete(
            url, option
          )
          break;
        case HttpType.File:
          let headers = new Headers();
          let options = new RequestOptions({ headers: headers });
          let formData: FormData = new FormData();
          files.forEach(b => {
            formData.append(b.FileName, b.File, b.File.name);
          })
          for (let key in data) {
            if (!data.hasOwnProperty(key)) {
              continue;
            }
            formData.append(String(key), String(data[key]));
          }
          observable = http.post(
            url, formData, options
          )
          break;
        case HttpType.Mix:
          let passModel = <ContentPostModel>data;
          let passHeaders = new Headers();
          let passOptions = new RequestOptions({ headers: passHeaders });
          let passFormData: FormData = new FormData();
          passModel.Properties.forEach((b, i) => {
            let key = `Properties[${i}].`;
            if (b.File != null) {
              passFormData.append(`${key}File`, b.File, b.File.name);
            } else {
              passFormData.append(`${key}File`, null);
            }
            passFormData.append(`${key}Key`, b.Key);
            passFormData.append(`${key}Value`, b.Value);
            b.MultiValue.forEach(
              (m, mi) => {
                passFormData.append(`${key}MultiValue[${mi}]`, m);
              }
            );
            passFormData.append(`${key}ValueType`, b.ValueType);
            passFormData.append(`${key}Title`, b.Title);
            passFormData.append(`${key}EditorType`, String(b.EditorType));
            passFormData.append(`${key}MultiSelect`, String(b.MultiSelect));
            b.SelectItems.forEach((ms, mi) => {
              passFormData.append(`${key}SelectItems[${mi}]`, ms.Name);
              passFormData.append(`${key}SelectItems[${mi}]`, String(ms.Select));
              passFormData.append(`${key}SelectItems[${mi}]`, ms.Value);
            })
            passFormData.append(`${key}RemoveFile`, String(b.RemoveFile));
            passFormData.append(`${key}BaseProperty`, String(b.BaseProperty));
            passFormData.append(`${key}IgnoreProperty`, String(b.IgnoreProperty));
            passFormData.append(`${key}CustomProperty`, String(b.CustomProperty));
          })
          passFormData.append("Id", passModel.Id);
          passFormData.append("ParentId", passModel.ParentId);
          passFormData.append("Name", passModel.Name);
          passFormData.append("SortOrder", String(passModel.SortOrder));
          passFormData.append("AssemblyName", passModel.AssemblyName);
          passFormData.append("FullType", passModel.FullType);
          passFormData.append("Publish", String(passModel.Publish));
          passFormData.append("RequireLogin", String(passModel.RequireLogin));

          observable = http.post(
            url, passFormData, passOptions
          )
          break

      }

      return observable.map((reponse: Response) => {
        try {
          let result = <T>reponse.json();
          if (result !== null) {
            return result;
          }
          return reponse;
        } catch{
          return reponse['_body'];
        }

      }).catch(error);
    };
  }
  static error(e: any) {
    let observable: Observable<Response>;
    return e;
  }
  static generalUrl(baseUrl: string) {
    return (url: string, additionalUrl: string) => {
      let additioinalUrlCheck = "";
      if (additionalUrl != null && typeof (additionalUrl) != 'undefined') {
        additioinalUrlCheck = additionalUrl;
      }
      if (url.indexOf('http') == 0) {
        return `${url}${additioinalUrlCheck}`;
      }
      return `${baseUrl}${url}${additioinalUrlCheck}`
    }
  }
  static GetHttpOption(): RequestOptions {
    let headers = new Headers(
      {
        "Content-Type": "application/json",
        "x-functions-key": "AhF9pqLZyd2//OZFqxvcGB97TnDkpDDfi5wqnMiTiVj0axECMr9T3Q=="
      })
    let options = new RequestOptions({ headers: headers });
    return options;
  }
  public static ConvertStringToNumner = function (input: any, def: number = 0): number {
    try {
      let result = Number(input);
      if (isNaN(result)) {
        return def;
      }
      return result;
    }
    catch (e) {
      return def;
    }
  }
}

export class FileContain {
  FileName: string;
  File: File;
  constructor(fileName: string, file: File) {
    this.FileName = fileName;
    this.File = file;
  }
}
