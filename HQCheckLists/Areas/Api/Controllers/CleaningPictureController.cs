using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HQCheckLists.Managers;
using HQCheckLists.Models.Apis;
using HQCheckLists.Models.Contents;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SDHCC.Core.MethodResponse;
using SDHCC.DB.Content;

namespace HQCheckLists.Areas.Api.Controllers
{
  [Area("Api")]
  public class CleaningPictureController : Controller
  {
    ICleaningPictureManager cleaningPictureManager;
    public CleaningPictureController(ICleaningPictureManager cleaningPictureManager)
    {
      this.cleaningPictureManager = cleaningPictureManager;
    }

    public JsonResult Create(string cleaningId)
    {
      if (cleaningId.IsNullOrEmpty() || cleaningId == "null")
      {
        cleaningId = null;
      }
      var model = cleaningPictureManager.CreateCleaningPic(User, cleaningId);
      return Json(new ApiResponse<ContentPostModel>(model != null, null, model));
    }
    [HttpPost]
    public JsonResult Create(ContentPostModel model)
    {
      cleaningPictureManager.CreateCleaningPic(User, model, out var response);
      return Json(new ApiResponse<ContentPostModel>(response.Success, null, model));
    }
    public JsonResult ReadByCleaningPicId(string cleaningPicId)
    {
      var result = cleaningPictureManager.GetCleaningPicById(User, cleaningPicId);
      return Json(new ApiResponse<CleaningPicture>(result != null, null, result));
    }
    public JsonResult ReadByCleaningId(string cleaningId)
    {
      var result = cleaningPictureManager.GetCleaningPicsByCleaningId(User, cleaningId);
      return Json(new ApiResponse<IEnumerable<CleaningPicture>>(result != null, null, result));
    }
    public JsonResult Update(string cleaningPicId)
    {
      var model = cleaningPictureManager.UpdateCleaningPic(User, cleaningPicId);
      return Json(new ApiResponse<ContentPostModel>(model != null, null, model));
    }
    [HttpPost]
    public JsonResult Update(ContentPostModel model)
    {
      cleaningPictureManager.UpdateCleaningPic(User, model, out var response);
      return Json(new ApiResponse<ContentPostModel>(response.Success, null, model));
    }

    [HttpPost]
    public JsonResult Delete([FromBody]CleaningPicture model)
    {
      cleaningPictureManager.DeleteCleaningPic(User, model, out var response);
      return Json(new ApiResponse<object>(response.Success));
    }
  }
}