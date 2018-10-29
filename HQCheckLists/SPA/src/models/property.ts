export class Property {
  Children: string[];
  Id: string;
  Name: string;
  PropertyAddress: string;
  PropertyOwner: string;
}

export class Inventory {
  Id: string;
  ParentId: string;
  Name: string;
  QTY: Number;
  Image: string;
  IsPercentage: boolean;
  ImageUpload: any;
}