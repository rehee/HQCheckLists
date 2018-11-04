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
}

export enum EnumInputType {
    Text,
    TextArea,
    Hidden,
    Number,
    DateTime,
    DropDwon,
    FileUpload,
    Bool
}
export class DropDownViewModel {
    Name: string = "";
    Value: string = "";
    Select: boolean = false;
}
