using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HQCheckLists.Managers;
using HQCheckLists.Models.Apis;
using HQCheckLists.Models.Users;
using Microsoft.AspNetCore.Mvc;

namespace HQCheckLists.Areas.Api.Controllers
{
  [Area("Api")]
  public class UserController : Controller
  {
    IUserManager userManager;
    public UserController(IUserManager userManager)
    {
      this.userManager = userManager;
    }

    public JsonResult ReadAllCleaner(bool activeUser = true)
    {
      var result = userManager.GetAllCleaner(User, activeUser);
      return Json(
        new ApiResponse<IEnumerable<HQUser>>(result != null, null, result));
    }
    public JsonResult ReadUserById(string id)
    {
      var result = userManager.GetUserById(User, id);
      return Json(
        new ApiResponse<HQUser>(result != null, null, result));
    }
  }
}