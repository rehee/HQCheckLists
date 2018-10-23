using SDHCC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists.Models.Contents
{
  [AllowChildren(ChildrenType = new Type[] { typeof(InventoryModel) })]
  public class PropertyModel : ContentBaseModel
  {

  }
}
