import { EnumStatus } from "./enums/enum-status";
import { FileContain } from "../core/core-function";

export class Cleaning {
  Id: string = "";
  PropertyId: string = "";
  ReservationId: string = "";
  CleanerId: string = "";
  CurrentGuestNumber:number = 1;
  NextGuestNumber:number = 1;
  CleaningDate: Date = new Date();

  CurrentBedUsed:number = 1;
  NextBookingDay: number = 1;
  CustomerPrepare: number = 1;
  SofaBad:boolean = false;
  SheetNumber:number = 1;
  BigSheetNumber:number = 0;
  CoverNumber:number = 1;

  NumberBathTowelInit: number = 1;
  NumberBathTowelActual: number = 1;
  NumberBathTowelActualIsFull: boolean = false;
  NumberBathTowelBring: number = 1;

  NumberHandTowelInit: number = 1;
  NumberHandTowelActual: number = 1;
  NumberHandTowelActualIsFull: boolean = false;
  NumberHandTowelBring: number = 1;

  NumberFloorTowelInit: number = 1;
  NumberFloorTowelActual: number = 1;
  NumberFloorTowelActualIsFull: boolean = false;
  NumberFloorTowelBring: number = 1;



  SpecialRequirement: string = "";
  Status: EnumStatus = EnumStatus.Draft;


  ImageCorridorId:string = "";

}


export class CleaningItem {
  Id: string = "";
  Name: string = "";
  CleaningId: string = "";
  InventoryId: string = "";
  IsFull: boolean = false;
  InitNumber: number = 0;
  ActuallyNumber: number = 0;
  IsPercentage: boolean = false;
  Comment: string = "";
  Images: string = "";

  UploadFile: FileContain = null;
}

export class CleanerJob {
  JobDate: Date = new Date();
  Jobs: ClearJobItem[] = [];
}
export class ClearJobItem {
  PropertyId: string;
  ReserveId: string;
  CleaningId: string;
  Title: string;
  CleaningDate: Date;
  Status: EnumStatus;
}
export class CleaningView {
  CleaningRecord: Cleaning = new Cleaning();
  Items: CleaningItem[] = []
}


export class CleaningPicture {
  Id:string;
  Name:string;
  CleaningId:string;
  Image:string;
  Comment:string;
}
