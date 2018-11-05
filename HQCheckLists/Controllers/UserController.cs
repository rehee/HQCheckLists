using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HQCheckLists.Models.Apis;
using HQCheckLists.Models.Enums;
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
    [HttpPost]
    public JsonResult CanAccess([FromBody]EnumPages page)
    {
      var result = new ApiResponse<object>(false, "", null);
      if (!HQE.PageAccessRoleMap.ContainsKey(page))
      {
        return Json(result);
      }
      var accessRoles = HQE.PageAccessRoleMap[page];
      if (accessRoles.Count() == 0)
      {
        result.Success = true;
      }
      else
      {
        var canAccess = users.IsUserInRoles(User, accessRoles);
        result.Success = canAccess;
      }
      return Json(result);
    }

    public JsonResult UserType()
    {
      var userType = EnumUserType.Anonymous;
      if (users.IsUserInRole(User, E.Setting.AdminRole))
      {
        userType = EnumUserType.Admin;
      }
      if (users.IsUserInRole(User, HQE.Setting.LandlordRole))
      {
        userType = EnumUserType.Landlord;
      }
      if (users.IsUserInRole(User, HQE.Setting.CleanerRole))
      {
        userType = EnumUserType.Cleaner;
      }
      return Json(new ApiResponse<EnumUserType>(true, null, userType));
    }
  }
}