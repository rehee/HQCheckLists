using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HQCheckLists.Managers;
using HQCheckLists.Models.Apis;
using HQCheckLists.Models.Contents;
using Microsoft.AspNetCore.Mvc;
using SDHCC.DB.Content;

namespace HQCheckLists.Areas.Api.Controllers
{
  [Area("Api")]
  public class CleaningController : Controller
  {
    ICleaningManager cleaningManager;
    public CleaningController(ICleaningManager cleaningManager)
    {
      this.cleaningManager = cleaningManager;
    }
    public JsonResult Create(string propertyId, string reservationId)
    {
      var result = cleaningManager.Create(User, propertyId, reservationId);
      return Json(new ApiResponse<ContentPostModel>(result != null, null, result));
    }
    [HttpPost]
    public JsonResult Create(ContentPostModel model)
    {
      cleaningManager.Create(User, model, out var response);
      return Json(new ApiResponse<ContentPostModel>(response.Success, null, model));
    }
    public JsonResult Read(string propertyId)
    {
      var result = cleaningManager.ReadAllForProperty(User, propertyId);
      return Json(new ApiResponse<IEnumerable<Cleaning>>(result != null, null, result));
    }
    public JsonResult Update(string cleaningId)
    {
      var result = cleaningManager.Update(User, cleaningId);
      return Json(new ApiResponse<ContentPostModel>(result != null, null, result));
    }
    [HttpPost]
    public JsonResult Update(ContentPostModel model)
    {
      cleaningManager.Update(User, model, out var response);
      return Json(new ApiResponse<ContentPostModel>(response.Success, null, model));
    }

    public JsonResult ReadByReservationId(string reservationId)
    {
      var cleaning = cleaningManager.CleaningGetByReservatinId(User, reservationId);
      return Json(new ApiResponse<Cleaning>(cleaning != null, null, cleaning));
    }
  }
}