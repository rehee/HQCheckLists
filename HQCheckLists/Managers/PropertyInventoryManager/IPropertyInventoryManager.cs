using HQCheckLists.Models.Contents;
using SDHCC.Core.MethodResponse;
using SDHCC.DB.Content;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HQCheckLists.Managers
{
  public interface IPropertyInventoryManager
  {
    IEnumerable<InventoryModel> GetAllInventory(ClaimsPrincipal user, string propertyId);
    ContentPostModel CreateInventory(ClaimsPrincipal user, string propertyId);
    void CreateInventory(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response);
    ContentPostModel UpdateInventory(ClaimsPrincipal user, string propertyId);
    void UpdateInventory(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response);
  }
}
