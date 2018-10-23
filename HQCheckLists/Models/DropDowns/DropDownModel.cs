using SDHCC;
using SDHCC.DB.Content;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models.DropDowns
{
  [AllowChildren(
    ChildrenType = new Type[] { },
    CreateRoles = new string[] { "Admin" },
    EditRoles = new string[] { "Admin" })]
  public class DropDownModel: DropDownBase
  {

  }
}
