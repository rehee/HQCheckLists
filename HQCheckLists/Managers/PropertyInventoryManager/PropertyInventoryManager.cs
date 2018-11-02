using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HQCheckLists.Models.Contents;
using HQCheckLists.Models.Users;
using HQCheckLists.Services.PropertyInventoryServices;
using HQCheckLists.Services.PropertyService;
using SDHCC.Core.MethodResponse;
using SDHCC.DB.Content;
using SDHCC.Identity.Services;

namespace HQCheckLists.Managers
{
  public class PropertyInventoryManager : IPropertyInventoryManager
  {
    IPropertyService ps;
    IPropertyInventoryService pis;
    ISDHCCIdentity us;
    public PropertyInventoryManager(IPropertyService ps, IPropertyInventoryService pis, ISDHCCIdentity us)
    {
      this.ps = ps;
      this.pis = pis;
      this.us = us;
    }
    public ContentPostModel CreateInventory(ClaimsPrincipal user, string propertyId)
    {
      if (!us.IsUserInRoles(user, HQE.Access.InventoryCreate, false) || propertyId.IsNullOrEmpty())
        return null;
      var property = checkProperty(propertyId);
      var model = new InventoryModel()
      {
        ParentId = propertyId
      };
      return model.ConvertToPassingModel();
    }
    public void CreateInventory(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response)
    {
      response = new MethodResponse();
      if (!us.IsUserInRoles(user, HQE.Access.InventoryCreate, false) || model == null || model.ParentId == null)
        return;
      var property = checkProperty(model.ParentId);
      if (property == null)
        return;
      pis.Create(model, out response);
    }

    public IEnumerable<InventoryModel> GetAllInventory(ClaimsPrincipal user, string propertyId)
    {
      if (!us.IsUserInRoles(user, HQE.Access.InventoryRead, false) || propertyId.IsNullOrEmpty())
        return null;
      var property = checkProperty(propertyId);
      if (property == null)
        return null;
      if (us.IsUserInRole(user, E.Setting.AdminRole))
      {
        return pis.Read(b => b.ParentId == propertyId).ToList();
      }
      var hqU = (HQUser)us.GetUserByName(user.Identity.Name);
      if (hqU.PropertyOwner == property.PropertyOwner)
      {
        return pis.Read(b => b.ParentId == propertyId).ToList();
      }
      return null;
    }

    public ContentPostModel UpdateInventory(ClaimsPrincipal user, string inventoryId)
    {
      if (!us.IsUserInRoles(user, HQE.Access.InventoryUpdate, false) || inventoryId.IsNullOrEmpty())
        return null;
      var inventory = pis.Read(b => b.Id == inventoryId).FirstOrDefault();
      if (inventory == null)
        return null;
      var property = checkProperty(inventory.ParentId);
      if (property == null)
        return null;
      return inventory.ConvertToPassingModel();
    }

    public void UpdateInventory(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response)
    {
      response = new MethodResponse();
      if (!us.IsUserInRoles(user, HQE.Access.InventoryUpdate, false) || model == null || model.Id.IsNullOrEmpty() || model.ParentId.IsNullOrEmpty())
        return;
      pis.Update(model, out response);
    }

    private PropertyModel checkProperty(string propertyId)
    {
      if (propertyId.IsNullOrEmpty())
        return null;
      return ps.Read(b => b.Id == propertyId).FirstOrDefault();
    }
  }
}
