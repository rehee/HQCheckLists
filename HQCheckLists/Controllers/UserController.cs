using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HQCheckLists.Models.Apis;
using HQCheckLists.ViewModels.Accounts;
using Microsoft.AspNetCore.Mvc;
using SDHCC.Identity.Services;

namespace HQCheckLists.Controllers
{
  public class UserController : Controller
  {
    private ISDHCCIdentity users;
    public UserController(ISDHCCIdentity users)
    {
      this.users = users;
    }
    public JsonResult CurrentUser()
    {
      var name = User.Identity.IsAuthenticated ? User.Identity.Name : "";
      var result = new ApiResponse<object>(User.Identity.IsAuthenticated, "", new { Name = name });
      return Json(result);
    }
    [HttpPost]
    public JsonResult Login([FromBody]LoginViewModel model)
    {
      var userName = users.CheckPassword(model.Login, model.Password);
      var result = new ApiResponse<object>(!String.IsNullOrEmpty(userName), "", new { Name = userName });
      return Json(result);
    }

    public JsonResult Logoff()
    {
      try
      {
        users.SignOut();
        var result = new ApiResponse<object>(true, "", new { Name = "" });
        return Json(result);
      }
      catch
      {
        var result = new ApiResponse<object>(false, "", new { Name = User.Identity.Name });
        return Json(result);
      }

    }
  }
}