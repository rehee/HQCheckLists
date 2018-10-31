using HQCheckLists.Models.Users;
using SDHCC.Identity.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace System
{
  public static class HQUserExtend
  {
    public static HQUser ConvertToHQUser(this ClaimsPrincipal user, ISDHCCIdentity userService)
    {
      if (user.Identity == null || !user.Identity.IsAuthenticated)
        return null;
      var currentUser = userService.GetUserByName(user.Identity.Name);
      if (currentUser == null)
        return null;
      return (HQUser)currentUser;
    }
  }
}
