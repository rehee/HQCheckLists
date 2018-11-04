import { EnumStatus } from "./enums/enum-status";

export class Cleaning {
  Id: string = "";
  PropertyId: string = "";
  ReservationId: string = "";
  CleanerId: string = "";
  CleaningDate: Date = new Date();

  NextBookingDay: number = 1;
  CustomerPrepare: number = 1;

  NumberBathTowelInit: number = 1;
  NumberBathTowelActual: number = 1;
  NumberBathTowelBring: number = 1;

  NumberHandTowelInit: number = 1;
  NumberHandTowelActual: number = 1;
  NumberHandTowelBring: number = 1;

  NumberFloorTowelInit: number = 1;
  NumberFloorTowelActual: number = 1;
  NumberFloorTowelBring: number = 1;



  SpecialRequirement: string = "";
  Status: EnumStatus = EnumStatus.Draft;

}


export class CleaningItem {
  Id: string = "";
  CleaningId: string = "";
  InventoryId: string = "";
  InitNumber: number = 0;
  ActuallyNumber: number = 0;
  IsPercentage: boolean = false;
  Comment: string = "";
  Images: string = "";
}
