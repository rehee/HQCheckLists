import { ContentProperty } from "./content-property";
import { DateTime } from "ionic-angular";

export class ContentPostModel {
  Properties: ContentProperty[] = [];

  ParentId: string = "";
  Children: string[] = [];
  Name: string = "";
  CreateTime: DateTime = null;
  SortOrder: number = 0;
  Publish: boolean = false;
  RequireLogin: boolean = false;
  PublicAccessRoles: string[] = [];
  AdminCreateRoles: string[] = [];
  AdminReadRoles: string[] = [];
  AdminUpdateRoles: string[] = [];
  AdminDeleteRoles: string[] = [];
  
  Id: string = "";
  FullType: string = "";
  AssemblyName:string = "";

}