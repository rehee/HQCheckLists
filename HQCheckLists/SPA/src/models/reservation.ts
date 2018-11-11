import { Cleaning } from "./cleaning";

export class Reservation {
  Id: string = "";
  PropertyId: string = "";
  GuestIds: string[] = [];

  CheckInDate: Date = new Date()
  CheckOutDate: Date = new Date();
  GuestNumber: number = 1;
  NeedCarpark: boolean = false;
  Comment: string = ""
  CleaningRecord: Cleaning = new Cleaning();
  BedNumber: number = 1;
  SofaBed: boolean = false;
}
