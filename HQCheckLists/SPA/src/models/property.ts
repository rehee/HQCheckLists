export class Property {
  Id: string;
  Children: string[];
  Name: string;
  PropertyAddress: string;
  PropertyOwner: string;
  Image: string;
  BedRoom:number;
  BathRoom: number;
  CleaningFee:number;
}

export class Inventory {
  Id: string;
  ParentId: string;
  Name: string;
  QTY: Number;
  Image: string;
  IsPercentage: boolean;
}
