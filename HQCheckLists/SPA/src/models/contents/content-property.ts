export class ContentProperty {
    Key: string = "";
    Value: string = "";
    MultiValue: string[] = [];
    ValueType: string = "";
    Title: string = "";
    EditorType: EnumInputType = EnumInputType.Text;
    MultiSelect: boolean = false;
    SelectItems: DropDownViewModel[] = [];
    File: File = null;
    RemoveFile: boolean = false;
    BaseProperty: boolean = false;
    IgnoreProperty: boolean = false;
    CustomProperty: boolean = false;
    RangeMin:number = 0;
    RangeMax:number = 100;
}

export enum EnumInputType {
    Text,
    TextArea,
    Hidden,
    Number,
    DateTime,
    DropDwon,
    FileUpload,
    Bool,
    Range
}
export class DropDownViewModel {
    Name: string = "";
    Value: string = "";
    Select: boolean = false;
}
