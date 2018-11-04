using HQCheckLists.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HQCheckLists.Managers
{
  public interface IUserManager
  {
    IEnumerable<HQUser> GetAllCleaner(ClaimsPrincipal user, bool active = true);
  }
}
