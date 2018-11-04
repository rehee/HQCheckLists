export class Cleaning {
  PropertyId: string = "";
  ReservationId: string = "";
  CheckInDate: Date = new Date();

  CleanerId: string = "";
  SpecialRequirement: string = "";
}


export class CleaningItem {
  CleaningId: string = "";
  InventoryId: string = "";
  InitNumber: number = 0;
  ActuallyNumber: number = 0;
  Comment: string = "";
  Images: string = "";
}
