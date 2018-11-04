using HQCheckLists.Models.DropDowns;
using SDHCC;
using SDHCC.Identity.Models.UserModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models.Users
{
  public class HQUser : SDHCCUserBase
  {
    [CustomProperty]
    [InputType(EditorType = EnumInputType.FileUpload)]
    public string Avata { get; set; } = "";

    [CustomProperty]
    [InputType(EditorType = EnumInputType.DropDwon, RelatedType = typeof(PropertyOwner))]
    public string PropertyOwner { get; set; } = "";

    [CustomProperty]
    [InputType(EditorType = EnumInputType.Bool)]
    public bool IsCleaner { get; set; } = false;
  }
}
