using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HQCheckLists.Managers;
using HQCheckLists.Models.Apis;
using Microsoft.AspNetCore.Mvc;
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
  }
}