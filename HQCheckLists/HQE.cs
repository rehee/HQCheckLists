using HQCheckLists.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HQCheckLists
{
  public static class HQE
  {
    public static HQSetting Setting { get; set; } = new HQSetting();
    public static AccessPermissions Access { get; set; } = new AccessPermissions();




    public static bool IsInHQRole(this ClaimsPrincipal user, EnumPages page, bool ifNoneRule = true)
    {
      if (!PageAccessRoleMap.ContainsKey(page))
        return ifNoneRule;
      var rule = PageAccessRoleMap[page].Select(b => b.ToLower());
      return rule.Where(b => user.IsInRole(b)).FirstOrDefault() != null;
    }
    public static bool IsInHQRole(this ClaimsPrincipal user, string role, bool ifNoneRule = true)
    {
      if (role.IsNormalized())
        return ifNoneRule;
      return user.IsInRole(role.ToLower());
    }
    public static Dictionary<EnumPages, IEnumerable<string>> PageAccessRoleMap { get; set; } =
      new Dictionary<EnumPages, IEnumerable<string>>
      {
        [EnumPages.PropertyIndex] = Access.PropertyIndex,
        [EnumPages.PropertyCreate] = Access.PropertyCreate,
        [EnumPages.PropertyUpdate] = Access.PropertyUpdate,

        [EnumPages.InventoryCreate] = Access.InventoryCreate,
        [EnumPages.InventoryRead] = Access.InventoryRead,
        [EnumPages.InventoryUpdate] = Access.InventoryUpdate,
        [EnumPages.InventoryDelete] = Access.InventoryDelete,
      };
  }

  public enum EnumPages
  {
    PropertyIndex = 1,
    PropertyCreate = 2,
    PropertyUpdate = 3,

    InventoryCreate = 201,
    InventoryRead = 202,
    InventoryUpdate = 203,
    InventoryDelete = 204,
  }
}
