using HQCheckLists.Models.DropDowns;
using HQCheckLists.Models.Users;
using Microsoft.AspNetCore.Http;
using SDHCC;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models.Contents
{
  [AllowChildren(ChildrenType = new Type[] { typeof(InventoryModel) })]
  public class PropertyModel : HQBaseModel
  {
    public string PropertyAddress { get; set; } = "";
    [InputType(EditorType = EnumInputType.DropDwon, RelatedType = typeof(PropertyOwner))]
    public string PropertyOwner { get; set; } = "";
    [InputType(EditorType = EnumInputType.FileUpload)]
    public string Image { get; set; } = "";

    [Display(Name ="浴室数量")]
    [InputType(EditorType = EnumInputType.Number)]
    public int BathRoom { get; set; } = 1;


  }
}
