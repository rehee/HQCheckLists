import { Cleaning } from "./cleaning";
import { EnumStatus } from "./enums/enum-status";

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

export class ReservationSummary {
  PropertyId: string = "";
  CleaningId: string = "";
  CurrentReservationId: string = "";
  CurrentReservation: Reservation;
  LastReservationId: string = "";
  LastReservation: Reservation;
  PropertyName: string = "";
  CleaningName: string = "";
  CleaningStatus?: EnumStatus;
}

export class ReservationSummaryDate {
  CheckInDate: Date;
  Reservations: ReservationSummary[] = [];
}
