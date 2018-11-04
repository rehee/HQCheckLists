using Microsoft.AspNetCore.Http;
using MongoDB.Bson.Serialization.Attributes;
using SDHCC;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models.Contents
{
  [AllowChildren(
    ChildrenType = new Type[] { },
    CreateRoles = new string[] { "Admin" },
    EditRoles = new string[] { "Admin" })]

  public class InventoryModel : HQBaseModel
  {
    [Display(Name ="百分比显示")]
    [InputType(EditorType = EnumInputType.Bool)]
    public bool IsPercentage { get; set; } = false;
    [Display(Name = "数量")]
    [InputType(EditorType = EnumInputType.Number)]
    public decimal QTY { get; set; } = 0;
    [Display(Name = "图片")]
    [InputType(EditorType =  EnumInputType.FileUpload)]
    public string Image { get; set; } = "";
  }
}
