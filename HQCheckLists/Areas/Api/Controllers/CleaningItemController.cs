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
  public class CleaningItemController : Controller
  {
    ICleaningItemManager cleaningItemManager;
    public CleaningItemController(ICleaningItemManager cleaningItemManager)
    {
      this.cleaningItemManager = cleaningItemManager;
    }

    public JsonResult ReadPostModels(string cleaningId)
    {
      var result = cleaningItemManager.CleaningItemsPostByCleaningId(User, cleaningId);
      return Json(new ApiResponse<IEnumerable<ContentPostModel>>(result != null, null, result));
    }
    [HttpPost]
    public JsonResult Update(ContentPostModel model)
    {
      cleaningItemManager.CleaningItemUpdate(User, model, out var response);
      return Json(new ApiResponse<object>(response.Success, null, null));
    }

    [HttpPost]
    public JsonResult UpdateItem(CleaningItem model, IFormFile UploadFile)
    {
      var response = new MethodResponse();
      try
      {
        var cleaningItem = cleaningItemManager.CleaningItemByCleaningItemId(User, model.Id);
        if (cleaningItem == null)
        {
          throw new Exception("");
        }
        if (UploadFile != null)
        {
          UploadFile.Save(out var filePath, nameof(CleaningItem));
          if (!cleaningItem.Images.IsNullOrEmpty())
          {
            cleaningItem.Images.DeleteFile(out var success);
          }
          cleaningItem.Images = filePath;
        }
        cleaningItem.IsFull = model.IsFull;
        cleaningItem.ActuallyNumber = model.ActuallyNumber;
        cleaningItemManager.CleaningItemUpdate(User, cleaningItem.ConvertToPassingModel(), out response);
      }
      catch{}
      return Json(new ApiResponse<object>(response.Success));
    }
  }
}