using HQCheckLists.Models.Contents;
using HQCheckLists.Models.Users;
using HQCheckLists.Services.PropertyService;
using SDHCC.Core.MethodResponse;
using SDHCC.DB.Content;
using SDHCC.Identity.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HQCheckLists.Managers
{
  public class PropertyManager : IPropertyManager
  {
    IPropertyService ps;
    ISDHCCIdentity us;
    public PropertyManager(IPropertyService ps, ISDHCCIdentity us)
    {
      this.ps = ps;
      this.us = us;
    }
    public ContentPostModel CreateProperty(ClaimsPrincipal user)
    {
      if (!user.IsInHQRole(E.Setting.AdminRole))
        return null;
      return ps.Create(new PropertyModel());
    }

    public void CreateProperty(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response)
    {
      response = new MethodResponse();
      if (!user.IsInHQRole(E.Setting.AdminRole))
        return;
      ps.Create(model, out response);
    }

    public IEnumerable<PropertyModel> GetAllProperty(ClaimsPrincipal user)
    {
      if (!us.IsUserInRoles(user, HQE.Access.PropertyIndex, false))
        return null;
      if (us.IsUserInRole(user, E.Setting.AdminRole))
      {
        return ps.Read(b => true).ToList();
      }
      var hqUser = (HQUser)us.GetUserByName(user.Identity.Name);
      return ps.Read(b => b.PropertyOwner == hqUser.PropertyOwner).ToList();
    }

    public PropertyModel GetProperty(ClaimsPrincipal user, string propertyId)
    {
      if (!us.IsUserInRoles(user, HQE.Access.PropertyIndex, false))
        return null;
      var p = ps.Read(b => b.Id == propertyId).FirstOrDefault();
      if (p == null)
        return null;
      if (us.IsUserInRole(user, E.Setting.AdminRole))
      {
        return p;
      }
      var hqUser = (HQUser)us.GetUserByName(user.Identity.Name);
      if (hqUser.PropertyOwner == p.PropertyOwner)
        return p;
      return null;
    }

    public ContentPostModel UpdateProperty(ClaimsPrincipal user, string propertyId)
    {
      if (!us.IsUserInRole(user, E.Setting.AdminRole))
      {
        return null;
      }
      var p = ps.Read(b => b.Id == propertyId).FirstOrDefault();
      if (p == null)
        return null;
      return p.ConvertToPassingModel();
    }

    public void UpdateProperty(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response, IEnumerable<string> takeKey = null, IEnumerable<string> ignoreKey = null)
    {
      response = new MethodResponse();
      if (!us.IsUserInRole(user, E.Setting.AdminRole))
      {
        return;
      }
      ps.Update(model, out response, takeKey, ignoreKey);
    }
  }
}
