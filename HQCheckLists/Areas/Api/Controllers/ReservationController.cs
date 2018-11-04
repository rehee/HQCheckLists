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
  public class ReservationController : Controller
  {
    IReservationManager reservationManager;
    public ReservationController(IReservationManager reservationManager)
    {
      this.reservationManager = reservationManager;
    }
    public JsonResult Create(string propertyId)
    {
      var model = reservationManager.ReservationCreate(User, propertyId);
      return Json(
        new ApiResponse<ContentPostModel>(model != null, null, model));
    }
    [HttpPost]
    public JsonResult Create(ContentPostModel model)
    {
      reservationManager.ReservationCreate(User, model, out var response);
      return Json(
        new ApiResponse<ContentPostModel>(response.Success, null, model));
    }
    public JsonResult Read(string propertyId)
    {
      var result = reservationManager.ReservationGetAll(User, propertyId);
      return Json(
        new ApiResponse<IEnumerable<Reservation>>(result != null, null, result));
    }
    public JsonResult Update(string reservationId)
    {
      var result = reservationManager.ReservationUpdate(User, reservationId);
      return Json(
        new ApiResponse<ContentPostModel>(result != null, null, result));
    }
    [HttpPost]
    public JsonResult Update(ContentPostModel model)
    {
      reservationManager.ReservationUpdate(User, model,out var response);
      return Json(
        new ApiResponse<ContentPostModel>(response.Success, null, model));
    }
  }
}