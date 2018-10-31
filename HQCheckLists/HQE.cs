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

    public static Dictionary<EnumPages, IEnumerable<string>> PageAccessRoleMap { get; set; } = new Dictionary<EnumPages, IEnumerable<string>>
    {
      [EnumPages.PropertyIndex] = Access.PropertyIndex,
      [EnumPages.PropertyCreate] = Access.PropertyCreate,
      [EnumPages.PropertyUpdate] = Access.PropertyUpdate,
    };
  }

  public enum EnumPages
  {
    PropertyIndex = 1,
    PropertyCreate = 2,
    PropertyUpdate = 3,
  }
}
