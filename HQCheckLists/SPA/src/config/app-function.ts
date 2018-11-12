import { LoadingController, Loading } from "ionic-angular";

export class AppFunctions {
  public static LoadingCtrl: LoadingController;
  public static Loader: Loading;
  public static SetLoadingCtrl(loadingCtrl: LoadingController) {
    AppFunctions.LoadingCtrl = loadingCtrl;
  }
  public static PresentLoader(text: string = "", duration: number = 0) {
    AppFunctions.Loader = AppFunctions.LoadingCtrl.create({
      content: text,
      duration: duration
    });
    AppFunctions.Loader.present();
  }
  public static DismissLoader() {
    if (!AppFunctions.Loader || !AppFunctions.Loader.dismiss) {
      return;
    }
    AppFunctions.Loader.dismiss();
  }

  public static GetRoomPicture(): RoomPicture[] {
    let result = [];
    result.push(new RoomPicture("ImageCorridorId","走廊"))
    return  result;
  }
}

export class RoomPicture {
  Property: string = "";
  Title: string = "";
  constructor(property: string = "", title: string = "") {
    this.Property = property;
    this.Title = title;
  }
}
