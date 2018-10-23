using SDHCC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models.Contents
{
  [AllowChildren(
    ChildrenType = new Type[] { },
    CreateRoles = new string[] { "Admin" },
    EditRoles = new string[] { "Admin" })]
  public class InventoryModel : ContentBaseModel
  {

  }
}
