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


    public string Image { get; set; } = "";
    [IgnoreEdit]
    public IFormFile ImageFile { get; set; } = null;
  }
}
