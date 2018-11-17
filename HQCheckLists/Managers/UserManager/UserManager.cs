using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HQCheckLists.Models.Users;
using SDHCC.DB;
using SDHCC.Identity.Services;

namespace HQCheckLists.Managers
{
  public class UserManager : IUserManager
  {
    ISDHCCIdentity userService;
    ISDHCCDbContext db;
    public UserManager(ISDHCCIdentity userService, ISDHCCDbContext db)
    {
      this.userService = userService;
      this.db = db;
    }
    public IEnumerable<HQUser> GetAllCleaner(ClaimsPrincipal user, bool active = true)
    {
      var query = db.Where<HQUser>(b => b.IsCleaner == true);
      if (active)
      {
        query = query.Where(b => b.IsDisableUser != true);
      }
      return query.ToList();
    }
    public HQUser GetUserById(ClaimsPrincipal user, string userId)
    {
      return db.Where<HQUser>(b => b.Id == userId).FirstOrDefault();
    }
  }
}
