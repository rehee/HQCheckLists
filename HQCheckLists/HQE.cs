using HQCheckLists.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HQCheckLists
{
  public static class HQE
  {
    public static HQSetting Setting { get; set; } = new HQSetting();
    public static AccessPermissions Access { get; set; } = new AccessPermissions();
  }
}
