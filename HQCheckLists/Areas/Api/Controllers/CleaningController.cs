using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HQCheckLists.Managers;
using HQCheckLists.Models.Apis;
using HQCheckLists.Models.Contents;
using HQCheckLists.ViewModels.Cleanings;
using Microsoft.AspNetCore.Mvc;
using SDHCC.Core.MethodResponse;
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

    [HttpPost]
    public JsonResult UpdateStartCleaning([FromBody]CleaningUp model)
    {
      cleaningManager.UpdateStatus(User, model.cleaningId, Models.Enums.EnumStatus.Processing, out var response);
      return Json(new ApiResponse<object>(response.Success, null));
    }
    [HttpPost]
    public JsonResult UpdateCompleteCleaning([FromBody]CleaningUp model)
    {
      cleaningManager.UpdateStatus(User, model.cleaningId, Models.Enums.EnumStatus.Complete, out var response);
      return Json(new ApiResponse<object>(response.Success, null));
    }

    [HttpPost]
    public JsonResult UpdateBedChecking([FromBody]Cleaning model)
    {
      var response = new MethodResponse();
      try
      {
        var cleaning = cleaningManager.CleaningGetByCleaningId(User, model.Id);
        if (cleaning == null || cleaning.CleaningRecord == null)
          throw new Exception("");
        cleaning.CleaningRecord.NumberBathTowelActual = model.NumberBathTowelActual;
        cleaning.CleaningRecord.NumberBathTowelActualIsFull = model.NumberBathTowelActualIsFull;
        cleaning.CleaningRecord.NumberHandTowelActual = model.NumberHandTowelActual;
        cleaning.CleaningRecord.NumberHandTowelActualIsFull = model.NumberHandTowelActualIsFull;
        cleaning.CleaningRecord.NumberFloorTowelActual = model.NumberFloorTowelActual;
        cleaning.CleaningRecord.NumberFloorTowelActualIsFull = model.NumberFloorTowelActualIsFull;
        cleaning.CleaningRecord.ImageCorridorId = model.ImageCorridorId;
        cleaningManager.Update(User, cleaning.CleaningRecord.ConvertToPassingModel(), out response);
      }
      catch { }
      return Json(new ApiResponse<object>(response.Success));
    }

    public JsonResult ReadByReservationId(string reservationId)
    {
      var cleaning = cleaningManager.CleaningGetByReservatinId(User, reservationId);
      return Json(new ApiResponse<Cleaning>(cleaning != null, null, cleaning));
    }
    public JsonResult ReadByCleaningId(string cleaningId)
    {
      var cleaning = cleaningManager.CleaningGetByCleaningId(User, cleaningId);
      return Json(new ApiResponse<CleaningView>(cleaning != null, null, cleaning));
    }

    public JsonResult ReadCleanerJon()
    {
      var jobs = cleaningManager.ReadAllJobForCleaner(User);
      return Json(new ApiResponse<IEnumerable<CleanerJob>>(jobs != null, null, jobs));
    }
  }
  public class CleaningUp
  {
    public string cleaningId { get; set; }
  }
}