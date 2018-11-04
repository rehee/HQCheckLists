using SDHCC;
using SDHCC.DB.Content;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models.Contents
{
  [AllowChildren(
    ChildrenType = new Type[] { typeof(PropertyModel) },
    CreateRoles = new string[] { "Admin" },
    EditRoles = new string[] { "Admin" })]
  public class HQBaseModel: ContentBase
  {

  }
}
