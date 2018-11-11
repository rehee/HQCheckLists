using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HQCheckLists.Models.Contents;
using HQCheckLists.Services;
using SDHCC.Core.MethodResponse;
using SDHCC.DB.Content;
using SDHCC.Identity.Services;

namespace HQCheckLists.Managers
{
  public class CleaningItemManager : ICleaningItemManager
  {
    IPropertyService propertyService;
    IPropertyInventoryService inventoryService;
    IReservationService reservationService;
    ISDHCCIdentity userService;
    ICleaningService cleaningService;
    ICleaningItemService cleanItemService;
    public CleaningItemManager(
      IPropertyService propertyService,
      IPropertyInventoryService inventoryService,
      IReservationService reservationService,
      ISDHCCIdentity userService,
      ICleaningService cleaningService,
      ICleaningItemService cleanItemService
      )
    {
      this.propertyService = propertyService;
      this.inventoryService = inventoryService;
      this.reservationService = reservationService;
      this.userService = userService;
      this.cleaningService = cleaningService;
      this.cleanItemService = cleanItemService;
    }
    public IEnumerable<CleaningItem> CleaningItemsByCleaningId(ClaimsPrincipal user, string cleaningId)
    {
      if (!userService.IsUserInRoles(user, HQE.Access.CleaningItemRead))
        return null;
      return cleanItemService.Read(b => b.CleaningId == cleaningId).ToList()
        .OrderByDescending(b => inventoryService.Read(c => c.Id == b.InventoryId).FirstOrDefault().SortOrder).ToList();
    }

    public IEnumerable<ContentPostModel> CleaningItemsPostByCleaningId(ClaimsPrincipal user, string cleaningId)
    {
      var models = CleaningItemsByCleaningId(user, cleaningId);
      if (models == null)
        return null;
      return models.Select(b => b.ConvertToPassingModel()).ToList();
    }

    public void CleaningItemUpdate(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response)
    {
      cleanItemService.Update(model, out response);
    }
    public CleaningItem CleaningItemByCleaningItemId(ClaimsPrincipal user, string cleaningItemId)
    {
      return cleanItemService.Read(b => b.Id == cleaningItemId).FirstOrDefault();
    }


  }
}
