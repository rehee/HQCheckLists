export class Reservation {
  Id:string = "";
  PropertyId: string = "";
  GuestIds: string[] = [];
  CheckInDate: Date = new Date()
  CheckOutDate: Date = new Date();
  NeedCarpark: boolean = false;
  Comment: string = ""
}
