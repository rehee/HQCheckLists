using HQCheckLists.Models.DropDowns;
using HQCheckLists.Models.Users;
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

  }
}
