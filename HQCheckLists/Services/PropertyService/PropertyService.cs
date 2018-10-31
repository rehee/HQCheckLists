using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HQCheckLists.Models.Contents;
using HQCheckLists.Models.Users;
using MongoDB.Bson;
using SDHCC;
using SDHCC.Core.MethodResponse;
using SDHCC.DB;
using SDHCC.DB.Content;
using SDHCC.Identity.Services;

namespace HQCheckLists.Services.PropertyService
{
  public class PropertyService : IPropertyService
  {
    ISDHCCDbContext db;
    ISDHCCIdentity users;
    public PropertyService(ISDHCCDbContext db, ISDHCCIdentity users)
    {
      this.db = db;
      this.users = users;
    }
    public IEnumerable<PropertyModel> GetAllPropertyByUser(ClaimsPrincipal user, out MethodResponse response)
    {
      response = new MethodResponse();
      var hqUser = user.ConvertToHQUser(users);
      if (hqUser == null || !users.IsUserInRoles(user, HQE.Access.PropertyIndex))
        return Enumerable.Empty<PropertyModel>();
      try
      {
        if (users.IsUserInRole(user, E.Setting.AdminRole))
        {
          response.Success = true;
          return db.GetChildrenContent("").Select(b => b as PropertyModel).ToList();
        }
        var ownerId = hqUser.PropertyOwner;
        var t = db.Where<PropertyModel>(b => b["ParentId"] == "", ((SDHCCDbContext)db).BaseContentType, db.ConvertBsonToGeneric<PropertyModel>()).ToList();
        var result = db.GetChildrenContent("").Select(b => b as PropertyModel).Where(b => b.PropertyOwner == ownerId).ToList();
        response.Success = true;
        return result;
      }
      catch
      {
        return Enumerable.Empty<PropertyModel>();
      }

    }
    public void CreateProperty(PropertyModel property, ClaimsPrincipal user, out MethodResponse response)
    {
      response = new MethodResponse();
      var hqUser = user.ConvertToHQUser(users);
      if (hqUser == null || !users.IsUserInRoles(user, HQE.Access.PropertyCreate))
        return;
      
      try
      {
        if (property.ImageFile != null)
        {
          property.ImageFile.Save(out var path);
          property.Image = path;
        }
        db.AddContent(property);
        response.Success = true;
      }
      catch { }
    }
    public void UpdateProperty(PropertyModel property, ClaimsPrincipal user, out MethodResponse response)
    {
      response = new MethodResponse();
      var hqUser = user.ConvertToHQUser(users);
      if (hqUser == null || !users.IsUserInRoles(user, HQE.Access.PropertyUpdate))
        return;

      try
      {
        if (property.ImageFile != null)
        {
          property.ImageFile.Save(out var path);
          property.Image = path;
        }
        var pass = property.ConvertToPassingModel();
        var p = db.GetContent(property.Id);
        var pPass = p.ConvertToPassingModel();
        pPass.Properties = pass.Properties;
        db.UpdateContent(pPass.ConvertToBaseModel());
        response.Success = true;
      }
      catch { }
    }
  }
}
