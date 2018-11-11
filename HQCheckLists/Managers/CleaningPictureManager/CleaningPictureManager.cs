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
  public class CleaningPictureManager : ICleaningPictureManager
  {
    IPropertyService propertyService;
    IPropertyInventoryService inventoryService;
    IReservationService reservationService;
    ISDHCCIdentity userService;
    ICleaningService cleaningService;
    ICleaningItemService cleanItemService;
    ICleaningPictureService cleanPicService;
    public CleaningPictureManager(
      IPropertyService propertyService,
      IPropertyInventoryService inventoryService,
      IReservationService reservationService,
      ISDHCCIdentity userService,
      ICleaningService cleaningService,
      ICleaningItemService cleanItemService,
      ICleaningPictureService cleanPicService
      )
    {
      this.propertyService = propertyService;
      this.inventoryService = inventoryService;
      this.reservationService = reservationService;
      this.userService = userService;
      this.cleaningService = cleaningService;
      this.cleanItemService = cleanItemService;
      this.cleanPicService = cleanPicService;
    }
    public ContentPostModel CreateCleaningPic(ClaimsPrincipal user, string cleaningId)
    {
      var pic = new CleaningPicture();
      if (!cleaningId.IsNullOrEmpty())
      {
        var cleaning = cleaningService.Read(b => b.Id == cleaningId).FirstOrDefault();
        if (cleaning == null)
          return null;
        pic.CleaningId = cleaning.Id;
      }
      return pic.ConvertToPassingModel();
    }

    public void CreateCleaningPic(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response)
    {
      response = new MethodResponse();
      cleanPicService.Create(model, out response);
    }

    public CleaningPicture GetCleaningPicById(ClaimsPrincipal user, string cleaningPictureId)
    {
      return cleanPicService.Read(b => b.Id == cleaningPictureId).FirstOrDefault();
    }

    public IEnumerable<CleaningPicture> GetCleaningPicsByCleaningId(ClaimsPrincipal user, string cleaningId)
    {
      if (cleaningId.IsNullOrEmpty())
        return null;
      return cleanPicService.Read(b => b.CleaningId == cleaningId).ToList();
    }

    public ContentPostModel UpdateCleaningPic(ClaimsPrincipal user, string cleaningPicId)
    {
      var pic = cleanPicService.Read(b => b.Id == cleaningPicId).FirstOrDefault();
      if (pic == null)
        return null;
      return pic.ConvertToPassingModel();
    }

    public void UpdateCleaningPic(ClaimsPrincipal user, ContentPostModel model, out MethodResponse response)
    {
      cleanPicService.Update(model, out response);
    }
    public void DeleteCleaningPic(ClaimsPrincipal user, CleaningPicture model, out MethodResponse response)
    {
      response = new MethodResponse();
      try
      {
        if (!model.Image.IsNullOrEmpty())
        {
          model.Image.DeleteFile(out var success);
        }
        cleanPicService.Delete(model.Id);
        response.Success = true;
      }
      catch { }

    }
  }
}
