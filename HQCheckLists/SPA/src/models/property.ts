export class Property {
  Id: string;
  Children: string[];
  Name: string;
  PropertyAddress: string;
  PropertyOwner: string;
  Image: string;
  BathRoom: number;
}

export class Inventory {
  Id: string;
  ParentId: string;
  Name: string;
  QTY: Number;
  Image: string;
  IsPercentage: boolean;
}
