using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HQCheckLists.Managers;
using HQCheckLists.Models.Apis;
using HQCheckLists.Models.Contents;
using HQCheckLists.Services.PropertyService;
using Microsoft.AspNetCore.Mvc;
using SDHCC.DB.Content;

namespace HQCheckLists.Areas.Api.Controllers
{
  [Area("Api")]
  public class PropertyController : Controller
  {
    IPropertyManager pm;
    public PropertyController(IPropertyManager pm)
    {
      this.pm = pm;
    }
    public JsonResult Index()
    {
      var result = pm.GetAllProperty(User);
      return Json(new ApiResponse<IEnumerable<PropertyModel>>(result != null, null, result));
    }
    [HttpPost]
    public JsonResult PreCreate()
    {
      var model = pm.CreateProperty(User);
      return Json(new ApiResponse<ContentPostModel>(model != null, null, model));
    }
    [HttpPost]
    public JsonResult Create(ContentPostModel model)
    {
      pm.CreateProperty(User, model, out var response);
      return Json(new ApiResponse<ContentPostModel>(response.Success, null, model));
    }
    [HttpPost]
    public JsonResult PreUpdate(string propertyId)
    {
      var model = pm.UpdateProperty(User, propertyId);
      return Json(new ApiResponse<ContentPostModel>(model != null, null, model));
    }
    [HttpPost]
    public JsonResult Update(ContentPostModel model)
    {
      pm.UpdateProperty(User, model, out var response);
      return Json(new ApiResponse<ContentPostModel>(response.Success, response.Message, model));
    }
  }
}